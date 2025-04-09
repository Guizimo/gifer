import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface PackageJson {
  version: string;
  [key: string]: unknown;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 package.json
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
) as PackageJson;

const version = packageJson.version;

// 读取 Cargo.toml
const cargoPath = join(__dirname, '../src-tauri/Cargo.toml');
let cargoContent = readFileSync(cargoPath, 'utf8');

// 更新版本号
cargoContent = cargoContent.replace(
  /version = "(.*?)"/,
  `version = "${version}"`
);

// 写入文件
writeFileSync(cargoPath, cargoContent, 'utf8');

console.log(`已更新 Cargo.toml 版本号到 ${version}`);