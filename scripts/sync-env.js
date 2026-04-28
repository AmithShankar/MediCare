const fs = require('fs');
const path = require('path');

const rootEnv = path.join(__dirname, '..', '.env');
if (!fs.existsSync(rootEnv)) {
  console.log('No root .env found. Skipping sync.');
  process.exit(0);
}

const appsDir = path.join(__dirname, '..', 'apps');
const apps = fs.readdirSync(appsDir).filter(f => fs.statSync(path.join(appsDir, f)).isDirectory());

apps.forEach(app => {
  const appEnv = path.join(appsDir, app, '.env.local');
  console.log(`Syncing .env to ${app}/.env.local...`);
  fs.copyFileSync(rootEnv, appEnv);
});

console.log('Env sync complete.');
