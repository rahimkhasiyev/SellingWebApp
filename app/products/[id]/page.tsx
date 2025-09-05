import Link from 'next/link';
import AddButton from './AddButton';

async function getProduct(id: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/products/${id}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.imageUrl ?? 'https://picsum.photos/seed/' + product.id + '/800/600'} alt={product.name} className="w-full rounded-lg object-cover" />
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="mt-2 text-gray-600">${product.price.toFixed(2)}</div>
        <p className="mt-4 text-gray-700">{product.description ?? 'No description'}</p>
        <div className="mt-6">
          {/* Prefer client-side add to cart for snappy UX */}
          {/* @ts-expect-error Server Component boundary */}
          <AddButton id={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl ?? undefined} />
        </div>
        <div className="mt-4">
          <Link href="/" className="text-sm text-brand-600 hover:underline">Back to products</Link>
        </div>
      </div>
    </div>
  );
}

