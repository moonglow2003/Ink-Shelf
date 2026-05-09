import TopAppBar from '@/components/TopAppBar';
import BottomNavBar from '@/components/BottomNavBar';
import Link from 'next/link';
import { getCurrentUserId, getUserProgress } from '@/lib/actions';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    redirect('/login');
  }

  const progress = await getUserProgress(userId);

  return (
    <>
      <TopAppBar />
      <main className="flex-grow container mx-auto px-gutter py-xl pb-32 md:pb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Sidebar / Profile Info */}
          <aside className="md:col-span-4 lg:col-span-3 flex flex-col gap-xl">
            {/* User Card */}
            <div className="bg-surface-container-lowest comic-border comic-shadow p-lg relative group">
              <div className="absolute inset-0 halftone-bg pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center text-center gap-md">
                <div className="w-32 h-32 rounded-full comic-border overflow-hidden bg-surface-variant flex items-center justify-center">
                  <span className="text-4xl uppercase">{user.name[0]}</span>
                </div>
                <div>
                  <h1 className="font-headline-md text-headline-md text-primary uppercase tracking-tight">{user.name}</h1>
                  <p className="font-label-md text-label-md text-secondary mt-unit uppercase">{user.email}</p>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">"Collecting the weird and wonderful lines of the world."</p>
                <button className="w-full mt-sm py-xs px-sm bg-primary text-on-primary font-label-md text-label-md uppercase comic-border transition-transform active:translate-y-[2px] active:translate-x-[2px] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-xs">
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit Profile
                </button>
              </div>
            </div>

            {/* Settings Nav */}
            <nav className="flex flex-col gap-md">
              <h2 className="font-headline-md text-headline-md text-primary uppercase border-b-2 border-primary pb-xs">Settings</h2>
              <ul className="flex flex-col gap-sm">
                <li>
                  <a className="flex items-center justify-between p-sm comic-border bg-surface-container-lowest hover:bg-surface-variant transition-colors group" href="#">
                    <span className="font-label-md text-label-md text-primary uppercase group-hover:translate-x-1 transition-transform">Account</span>
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </a>
                </li>
                <li>
                  <a className="flex items-center justify-between p-sm comic-border bg-surface-container-lowest hover:bg-surface-variant transition-colors group" href="#">
                    <span className="font-label-md text-label-md text-primary uppercase group-hover:translate-x-1 transition-transform">Notifications</span>
                    <span className="material-symbols-outlined text-primary">notifications</span>
                  </a>
                </li>
                <li>
                  <a className="flex items-center justify-between p-sm comic-border bg-surface-container-lowest hover:bg-surface-variant transition-colors group" href="#">
                    <span className="font-label-md text-label-md text-primary uppercase group-hover:translate-x-1 transition-transform">Privacy</span>
                    <span className="material-symbols-outlined text-primary">lock</span>
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section className="md:col-span-8 lg:col-span-9 flex flex-col gap-xl">
            {/* Stats Bento */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div className="bg-surface-container-lowest comic-border p-md flex flex-col items-center justify-center text-center">
                <span className="font-display-lg text-display-lg text-primary">{progress.length}</span>
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mt-unit">Read</span>
              </div>
              <div className="bg-surface-container-lowest comic-border p-md flex flex-col items-center justify-center text-center">
                <span className="font-display-lg text-display-lg text-primary">0</span>
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mt-unit">Wishlist</span>
              </div>
              <div className="bg-surface-container-lowest comic-border p-md flex flex-col items-center justify-center text-center col-span-2 md:col-span-2 relative overflow-hidden">
                <div className="absolute inset-0 halftone-bg"></div>
                <div className="relative z-10 flex items-center justify-between w-full px-sm">
                  <div className="text-left">
                    <span className="font-label-md text-label-md text-primary uppercase block">Current Read</span>
                    <span className="font-headline-md text-headline-md text-primary font-bold">{progress.length > 0 ? progress[0].book.title : 'None'}</span>
                  </div>
                  <span className="material-symbols-outlined text-[48px] text-primary">menu_book</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-md border-b-2 border-primary pb-xs overflow-x-auto hide-scrollbar">
              <button className="font-headline-md text-headline-md text-primary uppercase pb-unit border-b-4 border-primary whitespace-nowrap">Saved Books</button>
              <button className="font-headline-md text-headline-md text-secondary hover:text-primary uppercase pb-unit whitespace-nowrap transition-colors">Wishlist</button>
              <button className="font-headline-md text-headline-md text-secondary hover:text-primary uppercase pb-unit whitespace-nowrap transition-colors">History</button>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {progress.length === 0 && <p className="text-secondary col-span-full">No books saved yet.</p>}
              {progress.map((prog) => (
                <Link href={`/book/${prog.bookId}`} key={prog.id} className="bg-surface-container-lowest comic-border comic-shadow p-sm flex flex-col gap-sm group relative">
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-surface comic-border px-sm py-xs z-20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-label-md text-label-md text-primary uppercase">Ch {prog.chapterNo}</span>
                  </div>
                  <div className="aspect-[2/3] w-full border border-primary relative overflow-hidden bg-surface-variant p-2">
                    <img alt="Comic Cover" className="w-full h-full object-cover grayscale contrast-125" src={prog.book.coverImage}/>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-primary uppercase truncate">{prog.book.title}</h3>
                    <p className="font-body-md text-body-md text-secondary truncate">{prog.book.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <BottomNavBar />
    </>
  );
}
