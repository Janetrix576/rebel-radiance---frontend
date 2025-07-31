import React from 'react';
import ProductCard from './ProductCard'; 

export default function ProductGrid({ products, onProductClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          index={index}
          onClick={() => onProductClick(product.slug)}
        />
      ))}
    </div>
  );
}