# Gifer

<p align="center">
  <img src="./screenshots/preview.png" alt="GIF Maker Preview" width="800">
</p>

一个优雅的 GIF 制作工具，基于 Tauri 2.0 构建，提供直观的用户界面和强大的图片处理功能。

## ✨ 特性

- 🖼️ 支持多图片导入和管理
- 🎨 丰富的动画效果（淡入淡出、滑动、缩放）
- ⚙️ 全方位的参数控制
  - 自定义尺寸
  - 帧率调节
  - 质量控制
  - 循环设置
- 🎯 实时预览
- 💾 一键导出
- 🌓 深色模式支持

## 🚀 技术栈

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Rust + Tauri
- **UI Framework**: shadcn/ui
- **State Management**: React Hooks
- **Image Processing**: image-rs

## 📦 安装

```bash

克隆项目
git clone https://github.com/guizimo/gif-maker.git
安装依赖
cd gif-maker
pnpm install
开发环境运行
pnpm tauri dev
构建应用
pnpm tauri build

```
## 🔧 使用指南

1. **图片导入**
   - 拖拽图片到上传区域
   - 点击选择文件按钮
   
2. **参数设置**
   - 调整图片尺寸
   - 设置帧率和延迟
   - 选择动画效果
   - 配置质量和优化级别

3. **生成与导出**
   - 点击"生成 GIF"按钮
   - 预览效果
   - 点击下载按钮保存

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License © 2024 [Guizimo](https://github.com/guizimo)




生成icon

```shell
 pnpm tauri icon src/assets/logo.png
```
