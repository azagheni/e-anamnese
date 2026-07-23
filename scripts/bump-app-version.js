const fs = require('node:fs');
const path = require('node:path');

const VALID_BUMP_TYPES = new Set(['patch', 'minor', 'major']);
const bumpType = process.argv[2] || 'patch';
const dryRun = process.argv.includes('--dry-run');

if (!VALID_BUMP_TYPES.has(bumpType)) {
  console.error('Tipo invalido. Use: patch, minor ou major.');
  process.exit(1);
}

const versionFilePath = path.resolve(__dirname, '..', 'src', 'app', 'version.ts');
const source = fs.readFileSync(versionFilePath, 'utf8');
const match = source.match(/APP_VERSION\s*=\s*['\"](\d+)\.(\d+)\.(\d+)['\"]/);

if (!match) {
  console.error('Nao foi possivel encontrar APP_VERSION em src/app/version.ts');
  process.exit(1);
}

const current = {
  major: Number.parseInt(match[1], 10),
  minor: Number.parseInt(match[2], 10),
  patch: Number.parseInt(match[3], 10)
};

const next = { ...current };

if (bumpType === 'patch') {
  next.patch += 1;
} else if (bumpType === 'minor') {
  next.minor += 1;
  next.patch = 0;
} else {
  next.major += 1;
  next.minor = 0;
  next.patch = 0;
}

const currentVersion = `${current.major}.${current.minor}.${current.patch}`;
const nextVersion = `${next.major}.${next.minor}.${next.patch}`;

if (dryRun) {
  console.log(`[dry-run] APP_VERSION: ${currentVersion} -> ${nextVersion}`);
  process.exit(0);
}

const updatedSource = source.replace(
  /APP_VERSION\s*=\s*['\"]\d+\.\d+\.\d+['\"]/, 
  `APP_VERSION = '${nextVersion}'`
);

fs.writeFileSync(versionFilePath, updatedSource, 'utf8');
console.log(`APP_VERSION atualizada: ${currentVersion} -> ${nextVersion}`);
