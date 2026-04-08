const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sourceSchema = path.resolve(projectRoot, '../backend/prisma/schema.prisma');
const targetDir = path.resolve(projectRoot, 'prisma');
const targetSchema = path.resolve(targetDir, 'schema.prisma');

if (!fs.existsSync(sourceSchema)) {
  throw new Error(`Prisma schema not found at ${sourceSchema}`);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync(sourceSchema, targetSchema);

console.log(`Prisma schema copied to ${targetSchema}`);
