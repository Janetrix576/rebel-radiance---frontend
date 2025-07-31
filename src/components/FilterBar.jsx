import React from 'react';

export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onFilterChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === category.slug
              ? 'bg-electric-purple text-white shadow-lg'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}