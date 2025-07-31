import React, { useState, useEffect } from 'react';
import api from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/');
        setProducts(response.data);

        // Extract unique subcategories from the API response
        const uniqueSubcategories = ['All', ...new Set(
          response.data.map(product => product.category.split(' > ')[1])
        )];

        setCategories(uniqueSubcategories);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product =>
        product.category.includes(` > ${selectedCategory}`)
      );

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-dark-bg rounded-lg overflow-hidden shadow-lg border border-electric-blue/20 hover:scale-105 hover:shadow-2xl transition-all cursor-pointer"
            >
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <p className="text-electric-blue font-semibold">${product.display_price}</p>
                <p className="text-sm text-light-gray mt-1">Category: {product.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-light-gray">No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;