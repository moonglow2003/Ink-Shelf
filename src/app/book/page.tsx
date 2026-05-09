import TopAppBar from '@/components/TopAppBar';
import BottomNavBar from '@/components/BottomNavBar';
import Link from 'next/link';
import { getAllBooks } from '@/lib/actions';
import SearchBar from '@/components/SearchBar';

export default async function BookCatalog({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';
  const books = await getAllBooks(query);

  return (
    <>
      <TopAppBar />
      <main className="max-w-[1440px] mx-auto px-gutter py-xl flex flex-col gap-xl">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md border-b-4 border-primary pb-sm">
          <div className="flex flex-col gap-md">
            <h1 className="font-display-lg text-display-lg text-primary uppercase">
              {query ? `Search: "${query}"` : 'Catalog'}
            </h1>
            <p className="font-body-lg text-secondary">
              {query 
                ? `Found ${books.length} results for your search.` 
                : 'Browse our entire collection of ink-heavy stories.'}
            </p>
          </div>
          <div className="w-full md:w-96">
            <SearchBar initialQuery={query} />
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-md md:gap-gutter">
          {books.map((book) => (
            <Link href={`/book/${book.id}`} key={book.id} className="bg-surface border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-sm flex flex-col gap-sm hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
              <div className="w-full aspect-[2/3] border border-primary overflow-hidden relative bg-surface-variant p-2">
                <img alt="Book Cover" className="w-full h-full object-cover grayscale contrast-150 group-hover:scale-105 transition-transform duration-500" src={book.coverImage}/>
                {book.isStaffPick && (
                  <div className="absolute top-2 right-2 bg-primary text-on-primary px-2 py-1 font-label-md text-[10px] uppercase border border-surface">
                    Pick
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-xs mt-2">
                <h2 className="font-label-md text-label-md uppercase truncate text-primary">{book.title}</h2>
                <p className="font-body-sm text-[12px] text-secondary truncate">{book.author}</p>
                <p className="font-body-md text-body-md text-primary mt-1">₹ {book.price}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <BottomNavBar />
    </>
  );
}
