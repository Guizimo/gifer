const fs = require('fs');
const path = require('path');

// 读取 package.json 获取版本号
const packageJson = require('../package.json');
const version = packageJson.version;

// 读取 Cargo.toml
const cargoPath = path.join(__dirname, '../src-tauri/Cargo.toml');
let cargoContent = fs.readFileSync(cargoPath, 'utf8');

// 更新版本号
cargoContent = cargoContent.replace(
  /version = "(.*?)"/,
  `version = "${version}"`
);

// 写入文件
fs.writeFileSync(cargoPath, cargoContent, 'utf8');

console.log(`已更新 Cargo.toml 版本号到 ${version}`);