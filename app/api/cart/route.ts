import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // This route exists to avoid 404 when product page form posts to /api/cart
  // It simply redirects to cart page; client-side cart handles storage
  const formData = await req.formData();
  const productId = formData.get('productId');
  const url = new URL('/cart', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
  if (productId) url.searchParams.set('added', String(productId));
  return NextResponse.redirect(url);
}

