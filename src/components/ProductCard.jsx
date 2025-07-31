import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onClick, index }) {
  const { isFavorite, toggleFavorite } = useCart();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const categoryName = product.category?.parent?.name || product.category?.name;
  const subCategoryName = product.category?.parent ? product.category.name : null;

  return (
    <motion.div
      onClick={onClick}
      className="group cursor-pointer bg-dark-gray rounded-lg shadow-lg overflow-hidden relative border border-transparent hover:border-electric-blue transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 240, 255, 0.2)' }}
    >
      <div className="relative w-full h-80">
        <img
          src={product.main_image || 'https://placehold.co/400x600/0D0C1D/B026FF?text=REBEL'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-dark-bg/50 backdrop-blur-sm p-2 rounded-full text-white hover:text-electric-purple transition-colors z-10"
        >
          {isFavorite(product.id) ? <FaHeart size={20} className="text-electric-purple" /> : <FaRegHeart size={20} />}
        </button>
      </div>
      <div className="p-4 text-center bg-dark-gray flex-grow flex flex-col">
        <p className="text-xs text-electric-purple uppercase tracking-wider font-semibold">
          {categoryName} {subCategoryName && `/ ${subCategoryName}`}
        </p>
        <h3 className="text-lg font-semibold text-white truncate flex-grow mt-1">{product.name}</h3>
        <p className="mt-2 text-md font-bold text-electric-blue">
          {product.display_price ? `Ksh ${product.display_price}` : 'Price unavailable'}
        </p>
      </div>
    </motion.div>
  );
}