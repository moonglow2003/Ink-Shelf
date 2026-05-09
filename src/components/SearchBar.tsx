'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ initialQuery = '', placeholder = 'Search for titles, authors, or genres...', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/book?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/book');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex-1 relative ${className}`}>
      <span className="material-symbols-outlined absolute left-sm top-1/2 transform -translate-y-1/2 text-secondary pointer-events-none">search</span>
      <input 
        className="w-full bg-surface-container-lowest comic-border-b py-sm pl-xl pr-sm font-body-md text-body-md text-primary focus:outline-none focus:border-b-4 focus:border-primary transition-all rounded-none placeholder:text-secondary" 
        placeholder={placeholder} 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button 
          type="button" 
          onClick={() => setQuery('')}
          className="absolute right-sm top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary material-symbols-outlined text-sm cursor-pointer"
        >
          close
        </button>
      )}
    </form>
  );
}
