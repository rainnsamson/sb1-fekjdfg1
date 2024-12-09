import { useFilterStore } from '../store/useFilterStore';

export function Sidebar() {
  const { filter, setFilter } = useFilterStore();

  const filters = [
    { id: 'all', label: 'All Books' },
    { id: 'available', label: 'Available' },
    { id: 'unavailable', label: 'Unavailable' },
    { id: 'on-loan', label: 'On Loan' },
    { id: 'unknown', label: 'Unknown' }
  ];

  return (
    <div className="w-64 bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filter by Status</h2>
      <div className="space-y-2">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              filter === filterOption.id
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>
    </div>
  );
}