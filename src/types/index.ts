export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId?: string;
  courseYear?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  isbn: string;
  available: boolean;
  location: string;
  status: 'available' | 'unavailable' | 'on-loan' | 'unknown';
  copiesAvailable: number;
}

export interface BookHold {
  id: string;
  bookId: string;
  userId: string;
  book: Book;
  user: User;
  holdDate: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
}