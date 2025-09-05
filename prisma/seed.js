/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  if (count > 0) return;
  const products = Array.from({ length: 9 }).map((_, i) => ({
    name: `Product ${i + 1}`,
    description: 'A nice product',
    price: Number((Math.random() * 90 + 10).toFixed(2)),
    imageUrl: `https://picsum.photos/seed/p${i + 1}/800/600`,
  }));
  await prisma.product.createMany({ data: products });
}

main().finally(async () => {
  await prisma.$disconnect();
});

