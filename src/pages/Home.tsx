import { BookGrid } from '../components/BookGrid';
import { Sidebar } from '../components/Sidebar';
import { useFilterStore } from '../store/useFilterStore';

const SAMPLE_BOOKS = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://source.unsplash.com/random/800x600?book,1',
    description: 'A story of decadence and excess.',
    isbn: '978-0743273565',
    available: true,
    location: 'Fiction - F FITZ',
    status: 'available',
    copiesAvailable: 3
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://source.unsplash.com/random/800x600?book,2',
    description: 'A story of racial injustice and loss of innocence.',
    isbn: '978-0446310789',
    available: true,
    location: 'Fiction - L LEE',
    status: 'available',
    copiesAvailable: 2
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://source.unsplash.com/random/800x600?book,3',
    description: 'A dystopian social science fiction novel.',
    isbn: '978-0451524935',
    available: false,
    location: 'Fiction - O ORW',
    status: 'on-loan',
    copiesAvailable: 0
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://source.unsplash.com/random/800x600?book,4',
    description: 'A romantic novel of manners.',
    isbn: '978-0141439518',
    available: true,
    location: 'Fiction - A AUS',
    status: 'available',
    copiesAvailable: 1
  },
] as const;

export function Home() {
  const { filter } = useFilterStore();

  const filteredBooks = SAMPLE_BOOKS.filter((book) => {
    if (filter === 'all') return true;
    return book.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome to CIT Library</h1>
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search for books..."
          className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex gap-8">
        <Sidebar />
        <div className="flex-1">
          <BookGrid books={filteredBooks} />
        </div>
      </div>
    </div>
  );
}