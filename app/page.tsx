import Link from 'next/link';

export default async function HomePage() {
  const products = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/products`, { cache: 'no-store' })
    .then(async (r) => (r.ok ? r.json() : []))
    .catch(() => []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((p: any) => (
          <Link key={p.id} href={`/products/${p.id}`} className="group block rounded-lg border bg-white p-4 shadow-sm hover:shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imageUrl ?? 'https://picsum.photos/seed/' + p.id + '/400/300'} alt={p.name} className="h-48 w-full rounded object-cover" />
            <div className="mt-3">
              <div className="font-medium group-hover:underline">{p.name}</div>
              <div className="text-sm text-gray-600">${p.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
        {(!products || products.length === 0) && (
          <div className="text-gray-500">No products yet. Seed the database.</div>
        )}
      </div>
    </div>
  );
}

