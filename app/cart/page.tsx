'use client';
import { useEffect, useMemo, useState } from 'react';

type CartItem = { id: string; name: string; price: number; quantity: number; imageUrl?: string };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const checkout = async () => {
    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) });
    if (res.ok) {
      setItems([]);
      alert('Order placed!');
    } else {
      alert('Checkout failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid gap-4">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-4 rounded border bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.imageUrl ?? 'https://picsum.photos/seed/' + i.id + '/120/90'} alt={i.name} className="h-20 w-28 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-gray-600">${i.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(i.id, -1)} className="rounded border px-2 py-1">-</button>
                <div>{i.quantity}</div>
                <button onClick={() => updateQuantity(i.id, 1)} className="rounded border px-2 py-1">+</button>
              </div>
              <button onClick={() => removeItem(i.id)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between rounded border bg-white p-4">
            <div className="font-semibold">Total</div>
            <div>${total.toFixed(2)}</div>
          </div>
          <button onClick={checkout} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 self-end">Checkout</button>
        </div>
      )}
    </div>
  );
}

