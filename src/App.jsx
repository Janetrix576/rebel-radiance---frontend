import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext';
import Checkout from "./components/Checkout.jsx";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Account from './components/Account';
import LandingPage from './components/LandingPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Cart />
          <Footer />
        </div>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;