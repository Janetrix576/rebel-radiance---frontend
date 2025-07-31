import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductModal({ productSlug, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadDetails = async () => {
      if (!productSlug) {
        setError('Invalid product slug.');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get(`products/items/${productSlug}`);
        setDetails(res.data);
        if (res.data.variants?.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      } catch (err) {
        let errorMessage = 'Could not load product details.';
        if (err.response?.status === 404) {
          errorMessage = 'Product not found.';
        } else if (err.response?.status) {
          errorMessage += ` (Status: ${err.response.status})`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetails();
  }, [productSlug]);

  const handleAddToCart = () => {
    if (!details) return;
    if (details.variants?.length > 0 && !selectedVariant) {
      toast.error("Please select a variant.");
      return;
    }

    const itemToAdd = {
      id: selectedVariant?.id || details.id,
      name: details.name,
      price: parseFloat(selectedVariant?.price || details.price),
      image: details.images?.[0]?.image || 'https://placehold.co/600x800/0D0C1D/B026FF?text=REBEL',
      variantDescription: selectedVariant?.attributes?.map(a => a.value).join(' / ') || '',
    };

    addToCart(itemToAdd);
    onClose();
  };

  return (
    <AnimatePresence>
      {productSlug && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-gray rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden border-2 border-electric-purple/30"
            onClick={e => e.stopPropagation()}
          >
            {isLoading && (
              <div className="w-full p-12 text-center text-electric-blue text-xl font-semibold">
                Loading Radiance...
              </div>
            )}
            {error && (
              <div className="w-full p-12 text-center text-red-500 text-xl font-semibold">
                {error}
              </div>
            )}
            {details && (
              <>
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-dark-bg">
                  <img
                    src={details.images?.[0]?.image || ' https://placehold.co/600x800/0D0C1D/B026FF?text=REBEL'}
                    alt={details.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-electric-purple to-electric-blue bg-clip-text text-transparent">
                    {details.name}
                  </h2>
                  <p className="mt-2 text-2xl font-semibold text-electric-blue">
                    Ksh {selectedVariant ? parseFloat(selectedVariant.price).toFixed(2) : parseFloat(details.price).toFixed(2)}
                  </p>
                  <div className="mt-4 border-t border-light-gray/20 pt-4">
                    <h3 className="font-semibold text-electric-blue">Description</h3>
                    <p className="mt-2 text-slate-300">{details.description}</p>
                  </div>
                  {details.variants?.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-electric-blue mb-2">
                        {details.variants[0].attributes[0]?.attribute || 'Options'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {details.variants.map(variant => (
                          <button
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-4 py-2 text-sm rounded-md border transition-all ${
                              selectedVariant?.id === variant.id
                                ? 'bg-electric-blue text-dark-bg border-electric-blue'
                                : 'bg-dark-gray text-white border-light-gray/30 hover:border-electric-blue'
                            }`}
                          >
                            {variant.attributes.map(attr => attr.value).join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-auto pt-8">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-electric-purple to-electric-blue text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transform transition-transform duration-300"
                    >
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