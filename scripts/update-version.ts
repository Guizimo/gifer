import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
import { getNextVersion } from './get-next-version.js';

const type = process.argv[2] || 'patch';
// 定义版本类型
type VersionType = 'patch' | 'minor' | 'major';
const nextVersion = getNextVersion(type as VersionType);

interface PackageJson {
  version: string;
  [key: string]: unknown;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const version = nextVersion;

// 读取 Cargo.toml
const cargoPath = join(__dirname, '../src-tauri/Cargo.toml');
let cargoContent = readFileSync(cargoPath, 'utf8');

// 读取 tauri.conf.json
const tauriConfigPath = join(__dirname, '../src-tauri/tauri.conf.json');
let tauriConfig = JSON.parse(readFileSync(tauriConfigPath, 'utf8'));

// 更新版本号
cargoContent = cargoContent.replace(
  /version = "(.*?)"/,
  `version = "${version}"`
);
tauriConfig.version = version;

// 写入文件
writeFileSync(cargoPath, cargoContent, 'utf8');
writeFileSync(tauriConfigPath, JSON.stringify(tauriConfig, null, 2) + '\n', 'utf8');

// 更新 Cargo.lock
try {
  execSync('cd src-tauri && cargo check', { stdio: 'inherit' });
  
  // 提交更改
  execSync('git add src-tauri/Cargo.toml', { stdio: 'inherit' });
  execSync('git add src-tauri/Cargo.lock', { stdio: 'inherit' });
  execSync('git add src-tauri/tauri.conf.json', { stdio: 'inherit' });
  execSync(`git commit --amend --no-edit`, { stdio: 'inherit' });
  console.log(`已更新版本号到 ${version} 并提交更改`);
} catch (error) {
  console.error('提交更改时出错:', error);
  process.exit(1);
}