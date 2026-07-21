const fs = require('fs');
const path = require('path');

const defaultFile = path.resolve(process.cwd(), 'src', 'db-data.ts');
const inputFile = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : defaultFile;

const jumpKeys = new Set([
  'inicio',
  'fim',
  'sim',
  'nao',
  'naosei',
  'texto',
  'opcaoTexto',
  'checkbox',
  'usuario',
  'data',
  'endereco',
  'telefone',
  'email',
  'numero',
  'cpf',
  'escala',
  'informacao',
  'opcao1',
  'opcao2',
  'opcao3',
  'opcao4',
  'opcao5',
  'opcao6',
  'opcao7',
  'opcao8',
  'opcao9'
]);

function extractArray(rawFile) {
  const match = rawFile.match(/export const ANAMNESES:\s*any\s*=\s*([\s\S]*);\s*$/);
  if (!match) {
    throw new Error('Nao foi possivel extrair ANAMNESES do arquivo.');
  }

  // O arquivo ja contem apenas um array literal de objetos, entao avaliamos o trecho isolado.
  return Function(`"use strict"; return (${match[1]});`)();
}

function validate(records) {
  const issues = [];
  const ids = new Set(records.map((item) => item.id));
  const idCount = new Map();

  for (const item of records) {
    idCount.set(item.id, (idCount.get(item.id) || 0) + 1);
  }

  for (const [id, count] of idCount.entries()) {
    if (count > 1) {
      issues.push({ type: 'id-duplicado', id, count });
    }
  }

  for (const item of records) {
    const hasCheckboxDestination = Object.prototype.hasOwnProperty.call(item, 'checkbox');

    for (const [key, value] of Object.entries(item)) {
      if (jumpKeys.has(key) || /^opcao\d+$/.test(key)) {
        if (typeof value !== 'number') {
          issues.push({ type: 'destino-nao-numerico', id: item.id, key, value });
          continue;
        }

        if (!ids.has(value)) {
          issues.push({ type: 'id-destino-inexistente', id: item.id, key, value });
        }
      }

      const descMatch = key.match(/^opcao(\d+)_desc$/);
      if (descMatch) {
        const optionKey = `opcao${descMatch[1]}`;
        if (!Object.prototype.hasOwnProperty.call(item, optionKey) && !hasCheckboxDestination) {
          issues.push({ type: 'desc-sem-destino', id: item.id, key, desc: value });
        }
      }

      const iconMatch = key.match(/^opcao(\d+)_icon$/);
      if (iconMatch) {
        const optionKey = `opcao${iconMatch[1]}`;
        if (!Object.prototype.hasOwnProperty.call(item, optionKey) && !hasCheckboxDestination) {
          issues.push({ type: 'icon-sem-destino', id: item.id, key, icon: value });
        }
      }
    }
  }

  return {
    totalPerguntas: records.length,
    totalIdsUnicos: ids.size,
    totalIssues: issues.length,
    issues
  };
}

function main() {
  if (!fs.existsSync(inputFile)) {
    console.error(`Arquivo nao encontrado: ${inputFile}`);
    process.exit(1);
  }

  try {
    const rawFile = fs.readFileSync(inputFile, 'utf8');
    const records = extractArray(rawFile);
    const report = validate(records);

    if (report.totalIssues > 0) {
      console.error('Validacao finalizada com problemas.');
      console.error(JSON.stringify(report, null, 2));
      process.exit(1);
    }

    console.log('Validacao OK. Nenhum problema encontrado.');
    console.log(JSON.stringify(report, null, 2));
  } catch (error) {
    console.error('Falha ao validar arquivo de perguntas.');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
