'use client';

import { useCartStore, CartItem } from '@/store/cart';

export default function AddToCartButton({ book }: { book: CartItem }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button 
      onClick={() => addToCart(book)}
      className="flex-1 bg-primary text-on-primary border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all py-md px-md flex justify-center items-center gap-sm active:scale-[0.98]"
    >
      <span className="material-symbols-outlined">shopping_cart_checkout</span>
      <span className="font-label-md text-label-md uppercase tracking-widest">Add to Cart</span>
    </button>
  );
}
