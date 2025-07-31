import React from 'react';

export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onFilterChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
            activeFilter.toLowerCase() === category.slug.toLowerCase()
              ? 'bg-electric-blue text-dark-bg'
              : 'bg-dark-gray text-white hover:bg-electric-purple/50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}