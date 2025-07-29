import React from 'react';

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-[var(--electric-purple)] hover:bg-[var(--electric-purple-dark)] text-white py-2 px-4 rounded transition-colors w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;