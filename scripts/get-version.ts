const ref = process.env.GITHUB_REF || '';
const version = ref.replace('refs/tags/v', '');
console.log(version);