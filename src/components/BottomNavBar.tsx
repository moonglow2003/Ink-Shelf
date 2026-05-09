import Link from 'next/link';

export default function BottomNavBar() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 border-t-4 border-primary bg-surface-container-lowest shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center w-full h-20 px-sm">
        <Link href="/home" className="flex flex-col items-center justify-center bg-primary text-on-primary border-x-2 border-primary p-2 w-full h-full -mt-2 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] z-10">
          <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-headline-md text-xs uppercase tracking-wider">Home</span>
        </Link>
        <Link href="/book" className="flex flex-col items-center justify-center text-primary border-x border-surface-variant p-2 hover:bg-surface-variant transition-colors w-full h-full">
          <span className="material-symbols-outlined text-2xl mb-1 font-bold">menu_book</span>
          <span className="font-headline-md text-xs uppercase tracking-wider">Books</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-primary border-l border-surface-variant p-2 hover:bg-surface-variant transition-colors w-full h-full">
          <span className="material-symbols-outlined text-2xl mb-1 font-bold">person</span>
          <span className="font-headline-md text-xs uppercase tracking-wider">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
