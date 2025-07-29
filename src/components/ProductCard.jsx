import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onClick, index }) {
  return (
    <motion.div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
    >
      <div className="relative w-full h-80">
        <img
          src={product.main_image || 'https://placehold.co/400x600/e2e8f0/334155?text=Image'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-md text-gray-600">
          {product.display_price ? `Ksh ${product.display_price}` : 'Price unavailable'}
        </p>
      </div>
    </motion.div>
  );
}