import { execSync } from 'child_process';
import semver from 'semver';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

export function getNextVersion(type: 'major' | 'minor' | 'patch'): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  // 直接读取 package.json
  const packageJson = JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf8')
  );
  return semver.inc(packageJson.version, type) || packageJson.version;
}

if (import.meta.url === fileURLToPath(import.meta.url)) {
  const type = process.argv[2] as 'major' | 'minor' | 'patch';
  console.log(getNextVersion(type));
}