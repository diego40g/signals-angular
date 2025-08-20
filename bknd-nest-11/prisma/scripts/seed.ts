import { PrismaClient } from '@prisma/generated';
import { seedProducts } from '../seeds/products';
import { seedUsers } from '../seeds/users';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedProducts(prisma);
  // Agrega aquí otros seeds si los tienes
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });