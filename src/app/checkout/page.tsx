'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function Checkout() {
  const { items, removeFromCart, total, clearCart } = useCartStore();

  const handleCheckout = () => {
    alert('Checkout successful!');
    clearCart();
  };

  return (
    <>
      {/* Minimal Header */}
      <header className="w-full top-0 sticky bg-surface border-b-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
        <div className="flex justify-between items-center px-gutter py-md w-full max-w-full">
          <Link href="/home" className="text-primary hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer active:scale-95">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
          </Link>
          <div className="font-headline-lg text-headline-lg font-extrabold tracking-tighter text-primary">INKSHELF</div>
          <div className="w-6"></div> {/* Spacer for center alignment */}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-gutter py-xl max-w-6xl">
        <div className="mb-xl text-center">
          <h1 className="font-display-lg text-display-lg uppercase border-b-4 border-primary inline-block pb-2">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Cart Items Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-lg">
            <h2 className="font-headline-md text-headline-md uppercase tracking-wider mb-sm">Your Pull List</h2>
            
            {items.length === 0 ? (
              <p className="font-body-md text-secondary">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="comic-border bg-surface p-sm flex flex-col sm:flex-row gap-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                  <div className="w-full sm:w-32 h-40 border border-primary shrink-0 bg-surface-variant relative overflow-hidden">
                    <img alt="Comic Cover" className="object-cover w-full h-full grayscale contrast-125" src={item.coverImage}/>
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headline-md text-headline-md leading-tight mb-xs">{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-secondary hover:text-error transition-colors cursor-pointer p-1">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                        </button>
                      </div>
                      <p className="font-body-md text-on-surface">Standard Edition</p>
                    </div>
                    <div className="flex justify-between items-end mt-sm">
                      <p className="font-headline-md text-headline-md">₹ {item.price}</p>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Halftone Divider */}
            <div className="w-full h-4 halftone-bg my-sm"></div>

            {/* Payment Section */}
            <div>
              <h2 className="font-headline-md text-headline-md uppercase tracking-wider mb-md">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <label className="comic-border bg-surface p-sm flex items-center cursor-pointer hover:bg-surface-variant transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none group">
                  <input defaultChecked className="sr-only peer" name="payment" type="radio"/>
                  <div className="w-5 h-5 border-2 border-primary rounded-full mr-sm flex items-center justify-center peer-checked:bg-primary">
                    <div className="w-2 h-2 bg-surface rounded-full peer-checked:block hidden"></div>
                  </div>
                  <span className="material-symbols-outlined mr-sm" style={{ fontVariationSettings: "'FILL' 0" }}>qr_code_scanner</span>
                  <span className="font-label-md text-label-md flex-grow">UPI / QR</span>
                </label>
                
                <label className="comic-border bg-surface p-sm flex items-center cursor-pointer hover:bg-surface-variant transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none group">
                  <input className="sr-only peer" name="payment" type="radio"/>
                  <div className="w-5 h-5 border-2 border-primary rounded-full mr-sm flex items-center justify-center peer-checked:bg-primary">
                    <div className="w-2 h-2 bg-surface rounded-full peer-checked:block hidden"></div>
                  </div>
                  <span className="material-symbols-outlined mr-sm" style={{ fontVariationSettings: "'FILL' 0" }}>credit_card</span>
                  <span className="font-label-md text-label-md flex-grow">Credit / Debit Card</span>
                </label>
              </div>
            </div>
          </div>

          {/* Summary Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              {/* Order Summary Card */}
              <div className="comic-border bg-surface p-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-0">
                <h2 className="font-headline-md text-headline-md uppercase tracking-wider mb-md border-b-2 border-primary pb-xs">Order Summary</h2>
                <div className="space-y-sm mb-md font-body-md text-on-surface">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-bold">₹ {total()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold">₹ {items.length > 0 ? 50 : 0}</span>
                  </div>
                </div>
                <div className="border-t-2 border-primary pt-sm mb-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-headline-md text-headline-md uppercase">Total</span>
                    <span className="font-display-lg text-display-lg text-3xl">₹ {items.length > 0 ? total() + 50 : 0}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="w-full comic-border bg-primary text-on-primary py-sm font-label-md text-label-md uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(200,198,198,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Place Order
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                </button>
                <div className="mt-sm text-center">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                  <span className="font-body-md text-xs text-secondary ml-1">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
