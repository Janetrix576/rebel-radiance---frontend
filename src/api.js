const API_BASE_URL = 'https://rebel-radiance-backend.onrender.com';

export const api = {
  fetchProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/api/products/items/`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },
  fetchProductDetails: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/api/products/items/${slug}/`);
    if (!response.ok) throw new Error('Failed to fetch product details');
    return response.json();
  },
  fetchCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/api/products/categories/`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },
};