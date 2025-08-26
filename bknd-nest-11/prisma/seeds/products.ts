import { PrismaClient } from '@prisma/generated';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function seedProducts(prisma: PrismaClient) {
  // Nueva ruta al JSON de productos
  const productsPath = join(__dirname, '../data/jsons/products.json');
  const products = JSON.parse(readFileSync(productsPath, 'utf8'));

  for (const product of products) {
    // Nueva ruta a la imagen
    const imagePath = join(__dirname, '../data/assets/images/products', product.image);
    const imageBase64 = readFileSync(imagePath).toString('base64');

    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        ...product,
        image: imageBase64,
      },
    });
  }
}
