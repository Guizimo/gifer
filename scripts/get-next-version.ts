import { execSync } from 'child_process';
import semver from 'semver';
import { fileURLToPath } from 'url';

export function getNextVersion(type: 'major' | 'minor' | 'patch'): string {
  const currentVersion = JSON.parse(execSync('npm pkg get version').toString().replace(/"/g, ''));
  return semver.inc(currentVersion, type) || currentVersion;
}

// ES Module 方式检查是否直接运行
if (import.meta.url === fileURLToPath(import.meta.url)) {
  const type = process.argv[2] as 'major' | 'minor' | 'patch';
  console.log(getNextVersion(type));
}