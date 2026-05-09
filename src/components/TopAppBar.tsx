import Link from 'next/link';

export default function TopAppBar() {
  return (
    <header className="bg-surface-container-lowest w-full top-0 sticky border-b-4 border-primary shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] z-40">
      <div className="flex justify-between items-center px-sm md:px-gutter py-sm w-full max-w-full">
        {/* Leading Icon */}
        <button aria-label="Menu" className="md:hidden text-primary cursor-pointer active:scale-95 transition-all w-10 h-10 flex items-center justify-center border-2 border-transparent hover:border-primary hover:bg-surface-variant">
          <span className="material-symbols-outlined font-headline-lg text-headline-lg">menu</span>
        </button>

        {/* Brand Logo */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link href="/" className="font-headline-lg text-headline-lg font-extrabold tracking-tighter text-primary uppercase bg-primary text-on-primary px-2 py-1 transform -skew-x-6 inline-block shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(200,200,200,1)] transition-all">
            INKSHELF
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-lg">
          <Link href="/home" className="font-label-md text-label-md text-primary px-3 py-1 border-2 border-transparent hover:border-primary cursor-pointer hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">Home</Link>
          <Link href="/book" className="font-label-md text-label-md text-primary px-3 py-1 border-2 border-transparent hover:border-primary cursor-pointer hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">Books</Link>
          <Link href="/profile" className="font-label-md text-label-md text-primary px-3 py-1 border-2 border-transparent hover:border-primary cursor-pointer hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">Profile</Link>
        </nav>

        {/* Trailing Action */}
        <div className="flex gap-4 items-center">
          <Link href="/login" className="hidden md:block font-label-md text-label-md text-primary px-3 py-1 border-2 border-transparent hover:border-primary cursor-pointer hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all uppercase">
            Login
          </Link>
          <Link href="/checkout" aria-label="Cart" className="text-primary cursor-pointer active:scale-95 transition-all w-10 h-10 flex items-center justify-center border-2 border-transparent hover:border-primary hover:bg-surface-variant relative">
            <span className="material-symbols-outlined font-headline-lg text-headline-lg">shopping_cart</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center rounded-full border border-surface-container-lowest">2</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
