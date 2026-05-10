import TopAppBar from '@/components/TopAppBar';
import BottomNavBar from '@/components/BottomNavBar';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { getCurrentUserId, getStaffPicks, getTrendingBooks, getUserProgress } from '@/lib/actions';

export default async function Home() {
  const userId = await getCurrentUserId();
  const progress = userId ? await getUserProgress(userId) : [];
  const trending = await getTrendingBooks();
  const staffPicks = await getStaffPicks();
  
  const featuredPick = staffPicks.length > 0 ? staffPicks[0] : null;

  return (
    <>
      <TopAppBar />
      <main className="max-w-[1440px] mx-auto px-gutter py-xl">
        {/* Welcome Section */}
        <section className="mb-xl relative">
          <div className="absolute inset-0 halftone-bg z-[-1] rounded-xl"></div>
          <div className="comic-border p-lg bg-surface halftone-shadow-lg rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-lg">
            <div>
              <h1 className="font-display-lg text-display-lg text-primary mb-xs">Welcome back, Reader.</h1>
              <p className="font-body-lg text-body-lg text-secondary">Your ink is waiting. You have {progress.length} books in progress.</p>
            </div>
            <div className="flex gap-sm">
              <button className="comic-border px-md py-sm bg-primary text-on-primary font-label-md text-label-md uppercase halftone-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 rounded-DEFAULT">
                Resume
              </button>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="mb-xl">
          <div className="flex flex-col md:flex-row gap-md">
            <SearchBar />
            <div className="flex gap-sm overflow-x-auto pb-sm md:pb-0 hide-scrollbar">
              <button className="comic-border px-sm py-xs bg-surface font-label-md text-label-md text-primary whitespace-nowrap halftone-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-DEFAULT">Action</button>
              <button className="comic-border px-sm py-xs bg-surface font-label-md text-label-md text-primary whitespace-nowrap halftone-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-DEFAULT">Sci-Fi</button>
              <button className="comic-border px-sm py-xs bg-surface font-label-md text-label-md text-primary whitespace-nowrap halftone-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-DEFAULT">Slice of Life</button>
              <button className="flex items-center gap-xs comic-border px-sm py-xs bg-surface font-label-md text-label-md text-primary whitespace-nowrap halftone-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-DEFAULT">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>tune</span>
                Filters
              </button>
            </div>
          </div>
        </section>



        {/* Divider */}
        <div className="w-full h-[2px] bg-surface-variant halftone-bg mb-xl opacity-50"></div>

        {/* Recommendations Bento Box */}
        <section className="mb-xl">
          <div className="flex justify-between items-end mb-lg border-b-2 border-primary pb-sm">
            <h2 className="font-headline-md text-headline-md text-primary">Staff Picks & Trending</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md md:h-[400px]">
            {/* Large Featured Item */}
            {featuredPick && (
              <Link href={`/book/${featuredPick.id}`} className="md:col-span-2 relative comic-border bg-surface p-md halftone-shadow rounded-xl flex flex-col justify-end group cursor-pointer overflow-hidden min-h-[300px] md:min-h-0">
                <img alt="Featured Background" className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-opacity z-0" src={featuredPick.coverImage}/>
                <div className="relative z-10 bg-surface/90 border border-primary p-md inline-block max-w-md">
                  <div className="bg-primary text-on-primary font-label-md text-[10px] uppercase px-2 py-1 inline-block mb-sm">Staff Pick</div>
                  <h3 className="font-headline-lg text-headline-lg text-primary mb-xs">{featuredPick.title}</h3>
                  <p className="font-body-md text-secondary mb-sm line-clamp-2">{featuredPick.description}</p>
                  <span className="font-label-md text-label-md text-primary underline decoration-2 underline-offset-4">Read Now</span>
                </div>
              </Link>
            )}
            
            {/* Two Smaller Items Stacked */}
            <div className="flex flex-col gap-md">
              {trending.slice(0, 2).map((book, index) => (
                <Link href={`/book/${book.id}`} key={book.id} className="flex-1 comic-border bg-surface p-sm halftone-shadow rounded-xl group cursor-pointer flex items-center gap-sm">
                  <div className="w-20 h-28 border border-primary bg-surface-container flex-shrink-0">
                    <img alt="Book Cover" className="object-cover w-full h-full grayscale" src={book.coverImage}/>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-primary mb-xs line-clamp-1">{book.title}</h4>
                    <p className="font-body-md text-[14px] text-secondary mb-xs">{book.genres.split(',')[0]}</p>
                    <span className="font-label-md text-[12px] text-primary">{index === 0 ? 'Trending #1' : 'Trending'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button (AI Assistant) */}
      <button className="fixed bottom-28 right-gutter md:bottom-gutter md:right-gutter w-14 h-14 bg-primary text-on-primary rounded-full comic-border halftone-shadow flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-95 z-50">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      </button>

      <BottomNavBar />
    </>
  );
}
