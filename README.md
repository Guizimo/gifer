# Gifer

A elegant GIF maker tool built with Tauri 2.0, offering an intuitive user interface and powerful image processing capabilities.

一个优雅的开发者工具箱，基于 Tauri 2.0 构建，提供直观的用户界面和强大的图片处理功能。

![Gifer](./public/screenshots/home.png)

## ✨ Features | 特性

- 🖼️ Multi-image Import & Management | 支持多图片导入和管理
- 🎨 Rich Animation Effects (Fade, Slide, Zoom) | 丰富的动画效果（淡入淡出、滑动、缩放）
- ⚙️ Comprehensive Parameter Control | 全方位的参数控制
  - Custom Size | 自定义尺寸
  - Frame Rate Adjustment | 帧率调节
  - Quality Control | 质量控制
  - Loop Settings | 循环设置
- 🎯 Real-time Preview | 实时预览
- 💾 One-click Export | 一键导出
- 🌓 Dark Mode Support | 深色模式支持

## 🚀 Tech Stack | 技术栈

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Rust + Tauri
- **UI Framework**: shadcn/ui
- **State Management**: React Hooks
- **Image Processing**: image-rs

## 📦 Installation | 安装

```bash
# Clone the repository | 克隆项目
git clone https://github.com/guizimo/gifer.git

# Navigate to project directory | 进入项目目录
cd gifer

# Install dependencies | 安装依赖
pnpm install

# Run in development mode | 开发环境运行
pnpm tauri dev

# Build the application | 构建应用
pnpm tauri build
```

## 🔧 Usage Guide | 使用指南

1. **Image Import | 图片导入**
   - Drag and drop images to the upload area | 拖拽图片到上传区域
   - Click the file selection button | 点击选择文件按钮
   
2. **Parameter Settings | 参数设置**
   - Adjust image size | 调整图片尺寸
   - Set frame rate and delay | 设置帧率和延迟
   - Choose animation effects | 选择动画效果
   - Configure quality and optimization level | 配置质量和优化级别

3. **Generate & Export | 生成与导出**
   - Click "Generate GIF" button | 点击"生成 GIF"按钮
   - Preview the effect | 预览效果
   - Click download button to save | 点击下载按钮保存

## 💻 Development | 开发

### Project Structure | 项目结构

```
gifer/
├── src/              # Frontend source code | 前端源码
├── src-tauri/        # Rust backend code | Rust 后端代码
├── public/           # Static assets | 静态资源
└── components/       # React components | React 组件
```

### Generate Icons | 生成图标

```bash
pnpm tauri icon src/assets/logo.png
```

### Add Compoment

```bash
pnpm dlx shadcn@latest add xxx
```

## 🤝 Contributing | 贡献

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License | 许可

MIT License © 2025 [Guizimo](https://github.com/guizimo)
