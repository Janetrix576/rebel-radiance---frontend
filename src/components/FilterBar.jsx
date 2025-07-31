export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onFilterChange(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeFilter === cat.slug
              ? 'bg-electric-blue text-dark-bg'
              : 'bg-dark-bg text-light-gray hover:bg-electric-purple/20'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}