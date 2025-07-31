import React, { useState, useEffect } from 'react';
import api from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/products/items/');

        if (!response.data || response.data.length === 0) {
          setProducts([]);
          setCategories(['All']);
          setError('No products found.');
          return;
        }

        setProducts(response.data);

        const uniqueSubcategories = ['All'];
        response.data.forEach(product => {
          if (product.category && typeof product.category === 'string') {
            const parts = product.category.split(' > ');
            if (parts.length > 1 && parts[1]) {
              uniqueSubcategories.push(parts[1]);
            }
          }
        });
        setCategories([...new Set(uniqueSubcategories)]);

      } catch (err) {
        console.error('Failed to fetch products', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setCategories(['All']);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => {
        return product.category &&
               typeof product.category === 'string' &&
               product.category.includes(` > ${selectedCategory}`);
      });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-white">
        <p className="text-2xl font-semibold">Loading Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <p className="col-span-full text-center text-light-gray py-20">
        No products found matching your criteria.
      </p>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-electric-purple text-white shadow-glow'
                : 'bg-dark-bg text-light-gray hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-dark-bg rounded-lg overflow-hidden shadow-lg border border-electric-blue/20 hover:scale-105 hover:shadow-2xl transition-all cursor-pointer"
          >
            <img
              src={product.main_image || 'https://placehold.co/400x600/0D0C1D/B026FF?text=REBEL+Placeholder'}
              alt={product.name || 'Product Image'}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-white truncate">{product.name || 'Untitled Product'}</h3>
              <p className="text-electric-blue font-semibold">
                {product.display_price ? `$${product.display_price}` : 'Price N/A'}
              </p>
              <p className="text-sm text-light-gray mt-1">
                Category: {product.category || 'Uncategorized'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;