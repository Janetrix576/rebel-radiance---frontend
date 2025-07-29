import React from 'react';

export default function ProductGrid({ products, onProductClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.slug}
          onClick={() => onProductClick(product.slug)}
          className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={product.main_image || 'https://placehold.co/600x600/e2e8f0/334155?text=No+Image'}
            alt={product.name}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
