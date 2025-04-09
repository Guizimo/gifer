use base64::{engine::general_purpose, Engine as _};
use gif::{Encoder, Frame, Repeat};
use image::{DynamicImage, GenericImageView};
use std::fs::File;
use tauri::command;

#[derive(serde::Deserialize)]
pub struct GifOptions {
    repeat: String,
    delay: i32,
}

#[command]
pub async fn generate_gif(image_data: Vec<String>, options: GifOptions) -> Result<String, String> {
    // 创建临时输出路径
    let output_path = std::env::temp_dir().join("output.gif");

    // 解码 base64 并转换为图片
    let mut images: Vec<DynamicImage> = Vec::new();
    for data in image_data {
        let bytes = general_purpose::STANDARD
            .decode(data)
            .map_err(|e| e.to_string())?;

        let img = image::load_from_memory(&bytes).map_err(|e| e.to_string())?;
        images.push(img);
    }

    if images.is_empty() {
        return Err("No images provided".to_string());
    }

    // 获取第一张图片的尺寸
    let (width, height) = images[0].dimensions();

    // 创建 GIF 文件
    let file = File::create(&output_path).map_err(|e| e.to_string())?;
    let mut encoder =
        Encoder::new(file, width as u16, height as u16, &[]).map_err(|e| e.to_string())?;

    // 设置循环
    let repeat = match options.repeat.as_str() {
        "none" => Repeat::Finite(0),
        "infinite" => Repeat::Infinite,
        _ => {
            if let Ok(count) = options.repeat.parse::<u16>() {
                Repeat::Finite(count)
            } else {
                Repeat::Infinite
            }
        }
    };
    encoder.set_repeat(repeat).map_err(|e| e.to_string())?;

    // 设置帧延迟
    let delay = (options.delay / 10) as u16; // 转换为 1/100 秒单位

    // 处理每一帧
    // for (i, img) in images.iter().enumerate() {
    //     let mut frame = match options.animation.as_str() {
    //         "fade" => apply_fade_effect(img, i, images.len()),
    //         "slide" => apply_slide_effect(img, i, images.len()),
    //         "zoom" => apply_zoom_effect(img, i, images.len()),
    //         _ => Frame::from_rgb(width as u16, height as u16, &img.to_rgb8()),
    //     };

    //     frame.delay = delay;
    //     encoder.write_frame(&frame).map_err(|e| e.to_string())?;
    // }

    // 处理每一帧
    for img in images {
        let resized = img.resize(width, height, image::imageops::FilterType::Lanczos3);
        let rgb_img = resized.to_rgb8();

        let mut frame = Frame::from_rgb(width as u16, height as u16, &rgb_img);
        frame.delay = delay;

        encoder.write_frame(&frame).map_err(|e| e.to_string())?;
    }

    // 返回生成的 GIF 文件的 data URL
    let gif_data = std::fs::read(&output_path).map_err(|e| e.to_string())?;
    let base64_gif = general_purpose::STANDARD.encode(&gif_data);
    Ok(format!("data:image/gif;base64,{}", base64_gif))
}
