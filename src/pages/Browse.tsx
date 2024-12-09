import { useState } from 'react';
import { BookGrid } from '../components/BookGrid';

const API_URL = 'https://openlibrary.org/search.json';

interface SearchResult {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  isbn?: string[];
}

export function Browse() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&limit=8`);
      const data = await response.json();
      
      const formattedResults = data.docs.map((book: SearchResult) => ({
        id: book.key,
        title: book.title,
        author: book.author_name?.[0] || 'Unknown Author',
        coverImage: book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : 'https://source.unsplash.com/random/800x600?book',
        description: 'View on Open Library for more details.',
        isbn: book.isbn?.[0] || 'N/A',
        available: false,
        location: 'External Resource',
        status: 'unknown' as const,
        copiesAvailable: 0
      }));

      setResults(formattedResults);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Browse External Libraries</h1>
      
      <div className="flex gap-4 mb-8">
        <input
          type="search"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Find Books'}
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <BookGrid books={results} />
        </div>
      )}
    </div>
  );
}