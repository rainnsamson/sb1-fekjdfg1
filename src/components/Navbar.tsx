import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              CIT Library
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-indigo-200 transition">
                Catalog Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/bookshelf" className="hover:text-indigo-200 transition">
                    My Bookshelf
                  </Link>
                  <Link to="/browse" className="hover:text-indigo-200 transition">
                    Browse
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-6 w-6" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-800 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}