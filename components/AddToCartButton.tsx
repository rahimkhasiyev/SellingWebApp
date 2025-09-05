'use client';
import { useEffect, useState } from 'react';

type Props = { id: string; name: string; price: number; imageUrl?: string };

export default function AddToCartButton({ id, name, price, imageUrl }: Props) {
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    // noop for hydration safety
  }, []);

  const add = () => {
    setAdding(true);
    try {
      const stored = localStorage.getItem('cart');
      const cart = stored ? JSON.parse(stored) : [];
      const idx = cart.findIndex((i: any) => i.id === id);
      if (idx >= 0) {
        cart[idx].quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1, imageUrl });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    } finally {
      setAdding(false);
    }
  };

  return (
    <button onClick={add} disabled={adding} className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-50">
      {adding ? 'Adding…' : 'Add to Cart'}
    </button>
  );
}

