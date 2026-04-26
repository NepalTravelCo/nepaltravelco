import { prisma } from './src/lib/prisma';

async function main() {
  try {
    console.log("Attempting to connect to database using src/lib/prisma...");
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful:", result);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
