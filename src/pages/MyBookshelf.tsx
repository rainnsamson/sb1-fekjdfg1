import { useAuthStore } from '../store/useAuthStore';
import { useHoldStore } from '../store/useHoldStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function MyBookshelf() {
  const { isAuthenticated, user } = useAuthStore();
  const holds = useHoldStore((state) => state.holds);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const userHolds = holds.filter(hold => hold.userId === user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Student ID</p>
            <p className="font-medium">{user.studentId || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Course & Year</p>
            <p className="font-medium">{user.courseYear || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Book Holds</h2>
      {userHolds.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
          You don't have any book holds yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {userHolds.map((hold) => (
            <div key={hold.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex gap-6">
                <img
                  src={hold.book.coverImage}
                  alt={hold.book.title}
                  className="w-32 h-48 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {hold.book.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Author</p>
                      <p className="font-medium">{hold.book.author}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ISBN</p>
                      <p className="font-medium">{hold.book.isbn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hold Date</p>
                      <p className="font-medium">
                        {new Date(hold.holdDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className={`font-medium capitalize ${
                        hold.status === 'pending' ? 'text-yellow-600' :
                        hold.status === 'active' ? 'text-green-600' :
                        hold.status === 'completed' ? 'text-blue-600' :
                        'text-red-600'
                      }`}>
                        {hold.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}