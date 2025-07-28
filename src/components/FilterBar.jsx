import React from 'react';

export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onFilterChange(category.slug)}
          className={`px-4 py-2 rounded-md font-medium text-sm transition ${
            activeFilter === category.slug
              ? 'bg-white text-purple-700'
              : 'bg-purple-200 text-white hover:bg-white hover:text-purple-700'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
