import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';

export default function ProductModal({ productSlug, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      if (!productSlug) return;
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.fetchProductDetails(productSlug);
        setDetails(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        setError('Could not load product details.');
      } finally {
        setIsLoading(false);
      }
    };
    loadDetails();
  }, [productSlug]);

  return (
    <AnimatePresence>
      {productSlug && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-[#8A2BE2] to-[#40E0D0] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="w-full p-12 text-center text-white">Loading details...</div>
            )}
            {error && (
              <div className="w-full p-12 text-center text-red-200">{error}</div>
            )}
            {details && (
              <>
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  <img
                    src={
                      details.images?.[0]?.image ||
                      'https://placehold.co/600x800/e2e8f0/334155?text=Image'
                    }
                    alt={details.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto bg-white">
                  <h2 className="text-3xl font-bold text-gray-900">{details.name}</h2>
                  <p className="mt-2 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-teal-500">
                    Ksh {selectedVariant ? selectedVariant.price : 'N/A'}
                  </p>

                  <div className="mt-4 border-t pt-4">
                    <h3 className="font-semibold text-gray-700">Description</h3>
                    <p className="mt-2 text-gray-600">{details.description}</p>
                  </div>

                  {details.variants && details.variants.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-700">
                        {details.variants[0].attributes[0]?.attribute || 'Options'}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {details.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 text-sm rounded-md border transition-colors
                              ${
                                selectedVariant?.id === variant.id
                                  ? 'bg-purple-700 text-white border-purple-700'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                              }`}
                          >
                            {variant.attributes.map((attr) => attr.value).join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-8">
                    <button className="w-full bg-gradient-to-r from-purple-700 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
