import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  // Nueva ruta al JSON de productos
  const productsPath = join(__dirname, './seeds/products.json');
  const products = JSON.parse(readFileSync(productsPath, 'utf8'));

  for (const product of products) {
    // Nueva ruta a la imagen
    const imagePath = join(__dirname, 'data', product.image);
    const imageBase64 = readFileSync(imagePath).toString('base64');

    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: imageBase64,
      },
    });
  }
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