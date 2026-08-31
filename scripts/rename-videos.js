const fs = require('fs');
const path = require('path');

// Uso: node scripts/rename-videos.js [pasta...] [--dry-run]
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const targetArgs = args.filter((arg) => !arg.startsWith('--'));
const defaultDirs = [path.join('src', 'assets', 'videos'), path.join('src', 'assets', 'videos-dark')];
const targetDirs = (targetArgs.length > 0 ? targetArgs : defaultDirs).map((dir) =>
  path.resolve(process.cwd(), dir)
);
const usandoPadrao = targetArgs.length === 0;

function buildNewName(fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  // Mantem apenas o trecho antes do primeiro espaco: '2j1 az plata audio.mp4' -> '2j1.mp4'
  const newBase = base.split(' ')[0].trim();
  return newBase.toLowerCase() + ext.toLowerCase();
}

function renameInDir(targetDir) {
  const entries = fs.readdirSync(targetDir, { withFileTypes: true }).filter((entry) => entry.isFile());

  let renamed = 0;
  let skipped = 0;
  let conflicts = 0;

  for (const entry of entries) {
    const oldName = entry.name;
    const newName = buildNewName(oldName);

    if (!newName || newName === path.extname(oldName).toLowerCase()) {
      console.warn(`Ignorado (nome resultante vazio): ${oldName}`);
      skipped++;
      continue;
    }

    if (newName === oldName) {
      skipped++;
      continue;
    }

    const oldPath = path.join(targetDir, oldName);
    const newPath = path.join(targetDir, newName);

    // Em sistemas case-insensitive, so e conflito se apontar para outro arquivo.
    if (fs.existsSync(newPath) && newName.toLowerCase() !== oldName.toLowerCase()) {
      console.error(`Conflito: '${newName}' ja existe. Mantendo '${oldName}'.`);
      conflicts++;
      continue;
    }

    console.log(`${oldName} -> ${newName}`);

    if (!dryRun) {
      fs.renameSync(oldPath, newPath);
    }

    renamed++;
  }

  console.log('');
  console.log(`Pasta: ${targetDir}`);
  console.log(`${dryRun ? 'Seriam renomeados' : 'Renomeados'}: ${renamed}`);
  console.log(`Sem alteracao: ${skipped}`);
  console.log(`Conflitos: ${conflicts}`);
  console.log('');

  return conflicts;
}

function main() {
  let totalConflicts = 0;

  for (const targetDir of targetDirs) {
    if (!fs.existsSync(targetDir)) {
      // Pastas padrao ausentes sao apenas ignoradas (ex.: tema escuro ainda nao criado).
      if (usandoPadrao) {
        console.warn(`Pasta ignorada (nao encontrada): ${targetDir}\n`);
        continue;
      }
      console.error(`Pasta nao encontrada: ${targetDir}`);
      process.exit(1);
    }

    totalConflicts += renameInDir(targetDir);
  }

  if (totalConflicts > 0) {
    process.exit(1);
  }
}

main();
