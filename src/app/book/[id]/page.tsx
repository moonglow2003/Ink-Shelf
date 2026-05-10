export const dynamic = 'force-dynamic';
import TopAppBar from '@/components/TopAppBar';
import BottomNavBar from '@/components/BottomNavBar';
import Link from 'next/link';
import { getBookById, getMoreLikeThis } from '@/lib/actions';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

export default async function BookDetails({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);

  if (!book) {
    return notFound();
  }

  const relatedBooks = await getMoreLikeThis(book.id);
  const mainGenre = book.genres.split(',')[0];

  return (
    <>
      <TopAppBar />
      <main className="max-w-[1440px] mx-auto px-gutter py-xl flex flex-col gap-xl">
        {/* Breadcrumb / Back Action */}
        <Link href="/home" className="flex items-center gap-xs text-secondary hover:text-primary transition-colors cursor-pointer w-max group">
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Back to Browse</span>
        </Link>

        {/* Hero: Book Presentation Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Panel: Book Cover */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-primary translate-x-3 translate-y-3"></div>
            <div className="relative bg-surface border-2 border-primary p-md z-10 hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-300">
              <div className="border border-primary bg-surface-variant aspect-[2/3] overflow-hidden relative">
                <img alt="Manga Cover Art" className="w-full h-full object-cover mix-blend-multiply" src={book.coverImage} />
              </div>
            </div>
          </div>

          {/* Right Panel: Details & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-lg mt-md lg:mt-0 lg:pl-md">
            {/* Headers */}
            <div className="flex flex-col gap-sm">
              {book.isStaffPick && (
                <div className="inline-flex">
                  <div className="relative bg-surface border-2 border-primary px-sm py-xs inline-block">
                    <span className="font-label-md text-label-md uppercase tracking-widest text-primary">Staff Pick</span>
                    <div className="absolute -bottom-[6px] left-4 w-3 h-3 bg-surface border-b-2 border-r-2 border-primary transform rotate-45"></div>
                  </div>
                </div>
              )}
              <h2 className="font-display-lg text-display-lg uppercase leading-none mt-2 break-words">{book.title}</h2>
              <div className="flex flex-wrap items-center gap-x-md gap-y-xs font-label-md text-label-md text-on-surface-variant uppercase tracking-wide">
                <span>By {book.author}</span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span>{mainGenre}</span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span>Kuro Press</span>
              </div>
            </div>

            {/* Ratings & Price */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md border-y-2 border-primary py-md">
              <div className="flex flex-col gap-xs">
                <span className="font-label-md text-label-md text-secondary uppercase">Rating</span>
                <div className="flex items-center gap-1 text-primary">
                  {/* Simplistic rating rendering */}
                  {[...Array(Math.floor(book.rating))].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  {book.rating % 1 !== 0 && (
                    <span className="material-symbols-outlined">star_half</span>
                  )}
                  <span className="font-label-md text-label-md ml-2 underline decoration-2 underline-offset-4 cursor-pointer hover:bg-primary hover:text-on-primary transition-colors px-1">{book.rating} ({book.reviewCount} Reviews)</span>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-xs">
                <span className="font-label-md text-label-md text-secondary uppercase">Price</span>
                <span className="font-display-lg text-display-lg leading-none">₹ {book.price}</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="flex flex-col gap-sm">
              <h3 className="font-headline-md text-headline-md uppercase">Synopsis</h3>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed columns-1 md:columns-2 gap-md">
                {book.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-md mt-sm">
              <AddToCartButton book={{ id: book.id, title: book.title, price: book.price, coverImage: book.coverImage }} />
              <button aria-label="Add to Wishlist" className="w-16 flex-shrink-0 bg-surface text-primary border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex justify-center items-center active:scale-[0.98]">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="w-full h-8 bg-halftone border-y-2 border-primary my-md"></div>

        {/* Related Books Bento Grid */}
        <section className="flex flex-col gap-lg">
          <h3 className="font-headline-lg text-headline-lg uppercase border-b-2 border-primary pb-sm inline-block w-max">More Like This</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-gutter">
            {relatedBooks.map((relatedBook) => (
              <Link href={`/book/${relatedBook.id}`} key={relatedBook.id} className="bg-surface border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-sm flex flex-col gap-sm hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                <div className="w-full aspect-[2/3] border border-primary overflow-hidden relative bg-surface-variant p-2">
                  <img alt="Book Cover" className="w-full h-full object-cover grayscale contrast-150 group-hover:scale-105 transition-transform duration-500" src={relatedBook.coverImage} />
                </div>
                <div className="flex flex-col gap-xs mt-2">
                  <h4 className="font-label-md text-label-md uppercase truncate text-primary">{relatedBook.title}</h4>
                  <p className="font-body-md text-body-md text-secondary">₹ {relatedBook.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNavBar />
    </>
  );
}
