import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

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

// 提交更改
try {
  execSync('git add src-tauri/Cargo.toml', { stdio: 'inherit' });
  execSync('git add src-tauri/Cargo.lock', { stdio: 'inherit' });
  execSync(`git commit --amend --no-edit`, { stdio: 'inherit' });
  console.log(`已更新 Cargo.toml 版本号到 ${version} 并提交更改`);
} catch (error) {
  console.error('提交更改时出错:', error);
  process.exit(1);
}