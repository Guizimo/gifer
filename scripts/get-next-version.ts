import { execSync } from 'child_process';
import semver from 'semver';

export function getNextVersion(type: 'major' | 'minor' | 'patch'): string {
  const currentVersion = JSON.parse(execSync('npm pkg get version').toString().replace(/"/g, ''));
  return semver.inc(currentVersion, type) || currentVersion;
}

if (require.main === module) {
  const type = process.argv[2] as 'major' | 'minor' | 'patch';
  console.log(getNextVersion(type));
}