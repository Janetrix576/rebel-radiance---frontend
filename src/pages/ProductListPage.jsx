import React, { useState, useEffect } from 'react';
import api from '../api';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import FilterBar from '../components/FilterBar';
import { FaSearch } from 'react-icons/fa';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productsRes = await api.get('/products/items');
        const categoriesRes = await api.get('/products/categories');

        const productData = Array.isArray(productsRes.data)
          ? productsRes.data
          : productsRes.data.results || [];

        const categoryData = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : categoriesRes.data.results || [];

        const validProducts = productData.filter(p => p.category);

        setProducts(validProducts);
        setCategories([{ name: 'All', slug: 'all' }, ...categoryData]);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = products
    .filter((p) => {
      if (activeFilter === 'all') return true;
      const category = p.category;
      if (!category) return false;
      const parts = category.split(' > ');
      const mainCategory = parts[0]?.toLowerCase();
      const subCategory = parts[1]?.toLowerCase();
      return (
        mainCategory === activeFilter.toLowerCase() ||
        subCategory === activeFilter.toLowerCase()
      );
    })
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-dark-bg via-electric-purple/10 to-dark-bg" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-electric-purple via-electric-blue to-electric-purple">
            THE COLLECTION
          </h1>
          <p className="mt-4 text-lg text-slate-400">Luxury Redefined. Style Unbound.</p>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-5 p-4 bg-dark-gray/50 backdrop-blur-md rounded-lg border border-light-gray/20">
          <FilterBar
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-light-gray" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full bg-dark-bg text-white placeholder-light-gray/70 border border-light-gray/20 focus:outline-none focus:ring-2 focus:ring-electric-blue"
            />
          </div>
        </div>

        {isLoading && <p className="text-center text-2xl font-bold text-electric-blue">Charging the Glow...</p>}
        {error && <p className="text-center text-red-400 text-lg">{error}</p>}
        {!isLoading && !error && (
          filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} onProductClick={(slug) => setSelectedProductSlug(slug)} />
          ) : (
            <p className="text-center py-10 text-slate-400 text-lg">No products found matching your criteria.</p>
          )
        )}
        <ProductModal productSlug={selectedProductSlug} onClose={() => setSelectedProductSlug(null)} />
      </div>
    </div>
  );
}