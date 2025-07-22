import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import { api } from '../api';

export default function ProductListPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          api.fetchProducts(),
          api.fetchCategories(),
        ]);
        setAllProducts(productsData);
        setFilteredProducts(productsData);
        setCategories([{ name: 'All', slug: 'all' }, ...categoriesData]);
        console.log('Sample product category:', productsData[0]?.category);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Could not connect to the server. Please ensure the backend is running and refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let products = [...allProducts];

    if (activeFilter !== 'all') {
      products = products.filter((product) => {
        const productCategorySlug = typeof product.category === 'object'
          ? product.category?.slug
          : product.category;
        return productCategorySlug === activeFilter;
      });
    }

    if (searchTerm) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(products);
  }, [activeFilter, searchTerm, allProducts]);

  const handleFilterChange = (categorySlug) => {
    setActiveFilter(categorySlug);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, #B026FF 0%, transparent 40%),
            radial-gradient(circle at 90% 30%, #00F0FF 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, #B026FF 0%, transparent 35%)
          `,
          opacity: 0.25,
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(176, 38, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-5">
          <FilterBar
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Search products..."
            className="w-full sm:w-64 px-5 py-3 rounded-full shadow-xl bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-3 focus:ring-cyan-400/50 focus:scale-105 transition-transform duration-300 border border-white/20"
          />
        </div>
        {isLoading && (
          <div className="text-center py-16">
            <p
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(90deg, #B026FF, #00F0FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Charging the Glow...
            </p>
          </div>
        )}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full hover:shadow-lg transition-shadow"
            >
              Retry
            </button>
          </div>
        )}
        {!isLoading && !error && (
          <ProductGrid
            products={filteredProducts}
            onProductClick={(slug) => setSelectedProductSlug(slug)}
          />
        )}
        <ProductModal
          productSlug={selectedProductSlug}
          onClose={() => setSelectedProductSlug(null)}
        />
      </div>
    </div>
  );
}