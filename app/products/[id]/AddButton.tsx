'use client';
import AddToCartButton from '@/components/AddToCartButton';

export default function AddButton(props: { id: string; name: string; price: number; imageUrl?: string }) {
  return <AddToCartButton {...props} />;
}

