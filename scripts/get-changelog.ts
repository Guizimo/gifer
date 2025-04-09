import { readFileSync } from 'fs';
import { join } from 'path';

const version = process.argv[2];
if (!version) {
  console.error('请提供版本号');
  process.exit(1);
}

const changelogPath = join(process.cwd(), 'CHANGELOG.md');
const changelog = readFileSync(changelogPath, 'utf8');

const versionRegex = new RegExp(`## \\[${version}\\][\\s\\S]*?(?=## \\[|$)`);
const match = changelog.match(versionRegex);

if (match) {
  const content = match[0].trim();
  console.log(`CHANGELOG<<EOF
${content}
EOF`);
} else {
  console.error(`未找到版本 ${version} 的更新记录`);
  process.exit(1);
}