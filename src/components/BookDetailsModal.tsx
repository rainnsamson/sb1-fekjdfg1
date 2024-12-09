import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Book } from '../types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookDetailsModal({ book, isOpen, onClose }: BookDetailsModalProps) {
  if (!book) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {book.title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Location:</span> {book.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Available Copies:</span> {book.copiesAvailable}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`${book.available ? 'text-green-600' : 'text-red-600'}`}>
                      {book.available ? 'Available' : 'Unavailable'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">{book.description}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Child>
  );
}