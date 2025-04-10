use base64::{engine::general_purpose, Engine as _};
use image::{DynamicImage, GenericImageView};
use rayon::prelude::*;
use std::fs::File;
use std::io::BufWriter;
use std::time::Instant;
use tauri::command;
use gifski::{Settings, progress::NoProgress};

#[derive(serde::Deserialize)]
pub struct GifOptions {
    repeat: String,
    delay: i32,
}

#[command]
pub async fn generate_gif(image_data: Vec<String>, options: GifOptions) -> Result<String, String> {
    let total_start = Instant::now();
    let temp_dir = std::env::temp_dir();
    let output_path = temp_dir.join("output.gif");
    
    // 并行解码和处理图片
    let decode_start = Instant::now();
    let images: Result<Vec<DynamicImage>, String> = image_data.par_iter()
        .map(|data| {
            let bytes = general_purpose::STANDARD
                .decode(data)
                .map_err(|e| e.to_string())?;
            image::load_from_memory(&bytes).map_err(|e| e.to_string())
        })
        .collect();
    let decode_time = decode_start.elapsed();
    println!("图片解码耗时: {:?}", decode_time);

    let images = images?;
    
    if images.is_empty() {
        return Err("No images provided".to_string());
    }

    // 获取第一张图片的尺寸
    let (width, height) = images[0].dimensions();
    println!("图片尺寸: {}x{}", width, height);

    // 设置帧延迟（秒）
    let delay_secs = options.delay as f64 / 1000.0;
    
    // 创建临时文件保存每一帧，使用并行处理
    let resize_start = Instant::now();
    let frame_paths: Vec<_> = images.par_iter().enumerate()
        .map(|(i, img)| {
            let frame_path = temp_dir.join(format!("frame_{}.png", i));
            // 使用 RGB8 格式直接保存，减少转换开销
            img.to_rgb8()
                .save(&frame_path)
                .map_err(|e| e.to_string())?;
            Ok(frame_path)
        })
        .collect::<Result<Vec<_>, String>>()?;
    let resize_time = resize_start.elapsed();
    println!("图片处理耗时: {:?}", resize_time);
    
    // 使用 gifski 生成 GIF
    let write_start = Instant::now();
    
    // 配置 gifski
    let settings = Settings {
        width: Some(width as u32),
        height: Some(height as u32),
        quality: 90,
        fast: true, // 高质量模式
        repeat: match options.repeat.as_str() {
            "none" => gifski::Repeat::Finite(1),
            "infinite" => gifski::Repeat::Infinite,
            _ => {
                if let Ok(count) = options.repeat.parse::<u16>() {
                    // 修复：直接使用 u16 类型，不需要转换为 usize
                    gifski::Repeat::Finite(count)
                } else {
                    gifski::Repeat::Infinite
                }
            }
        },
    };
    
    let (collector, writer) = gifski::new(settings).map_err(|e| e.to_string())?;
    
    // 启动一个线程来收集帧
    let collect_thread = std::thread::spawn({
        let frame_paths = frame_paths.clone(); // 克隆 frame_paths 给线程使用
        move || {
            let collector = collector; // 移除 mut，因为不需要
            
            for (i, path) in frame_paths.iter().enumerate() {
                let timestamp = i as f64 * delay_secs;
                if let Err(e) = collector.add_frame_png_file(i, path.clone(), timestamp) {
                    eprintln!("添加帧失败: {}", e);
                }
            }
            
            // 释放收集器
            drop(collector);
        }
    });
    
    // 写入 GIF 文件
    let file = File::create(&output_path).map_err(|e| e.to_string())?;
    let buf_writer = BufWriter::with_capacity(1024 * 1024, file);
    
    writer.write(buf_writer, &mut NoProgress {})
        .map_err(|e| e.to_string())?;
    
    // 等待收集线程完成
    collect_thread.join().map_err(|_| "线程错误".to_string())?;
    
    let write_time = write_start.elapsed();
    println!("帧写入耗时: {:?}", write_time);

    // 清理临时文件
    for path in frame_paths {
        let _ = std::fs::remove_file(path);
    }

    // 返回生成的 GIF 文件的 data URL
    let encode_start = Instant::now();
    let gif_data = std::fs::read(&output_path).map_err(|e| e.to_string())?;
    let base64_gif = general_purpose::STANDARD.encode(&gif_data);
    let encode_time = encode_start.elapsed();
    println!("Base64编码耗时: {:?}", encode_time);

    let total_time = total_start.elapsed();
    println!("GIF生成总耗时: {:?}, 图片数量: {}", total_time, images.len());
    
    Ok(format!("data:image/gif;base64,{}", base64_gif))
}