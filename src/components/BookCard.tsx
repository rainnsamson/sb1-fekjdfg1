import { useState } from 'react';
import { Book } from '../types';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { useHoldStore } from '../store/useHoldStore';
import { BookDetailsModal } from './BookDetailsModal';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const addHold = useHoldStore((state) => state.addHold);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHold = () => {
    if (!isAuthenticated) {
      toast.error('Please login to place a hold on books');
      return;
    }
    if (!user) {
      toast.error('User information not found');
      return;
    }
    if (book.copiesAvailable === 0) {
      toast.error('No copies available for hold');
      return;
    }

    const newHold = {
      id: crypto.randomUUID(),
      bookId: book.id,
      userId: user.id,
      book,
      user,
      holdDate: new Date().toISOString(),
      status: 'pending' as const
    };

    addHold(newHold);
    toast.success(`Hold request placed for "${book.title}". Waiting for admin approval.`);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div 
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{book.author}</p>
            <p className="text-sm mb-4">
              <span className={`${
                book.copiesAvailable > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {book.copiesAvailable} {book.copiesAvailable === 1 ? 'copy' : 'copies'} available
              </span>
            </p>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            <button
              onClick={handleHold}
              disabled={!book.available || book.copiesAvailable === 0}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                book.available && book.copiesAvailable > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {book.available && book.copiesAvailable > 0 ? 'Hold' : 'Unavailable'}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-md text-sm font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <BookDetailsModal
        book={book}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}