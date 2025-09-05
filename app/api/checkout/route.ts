import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }

    // Validate items against database and compute total
    const productIds = items.map((i: any) => String(i.id));
    const dbProducts = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const idToProduct = new Map(dbProducts.map((p) => [p.id, p]));

    let total = 0;
    const orderItems: { productId: string; quantity: number; unitPrice: number }[] = [];
    for (const i of items) {
      const p = idToProduct.get(String(i.id));
      if (!p) continue;
      const quantity = Math.max(1, Number(i.quantity || 1));
      total += p.price * quantity;
      orderItems.push({ productId: p.id, quantity, unitPrice: p.price });
    }
    if (orderItems.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        total,
        items: { create: orderItems },
      },
      include: { items: true },
    });
    return NextResponse.json({ id: order.id, total });
  } catch (e) {
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}

