const fs = require('fs');
const path = require('path');

const root = process.cwd();
const required = ['server', 'android-client', 'docs'];
const missing = required.filter((dir) => !fs.existsSync(path.join(root, dir)));

console.log(`Current directory: ${root}`);
if (missing.length > 0) {
  console.error('This does not look like the LANsurveil repo root.');
  console.error(`Missing expected directories: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Repo root looks good.');
console.log('Next steps:');
console.log('1) npm run server:install');
console.log('2) npm start');
