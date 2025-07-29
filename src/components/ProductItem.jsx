import React from 'react';
import { useCart } from '../context/CartContext';

const ProductItem = ({ product, onProductClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const firstVariant = product.variants?.[0];
    if (!firstVariant) {
        console.error("Product has no variants to add to cart.", product);
        return;
    }

    const itemToAdd = {
      id: firstVariant.id,
      name: product.name,
      price: parseFloat(firstVariant.price),
      image: product.images?.[0]?.image || 'https://via.placeholder.com/300',
      variantDescription: firstVariant.attributes?.map(attr => attr.value).join(' ') || ''
    };
    addToCart(itemToAdd);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onProductClick(product.slug)}
    >
      <div className="w-full h-48 bg-gray-100 rounded-t-lg mb-4">
        <img
          src={product.images?.[0]?.image || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 flex-grow">{product.name}</h3>
        <p className="text-gray-600 mt-1">Ksh {parseFloat(product.price).toFixed(2)}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;