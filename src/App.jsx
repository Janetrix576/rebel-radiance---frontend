
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientId = '642335350301-goq2co22qho68mrb548lu7jto62kief5.apps.googleusercontent.com'; 
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

import CheckoutPage from "../pages/CheckoutPage";

function App() {
  return (
    <div className="App">
      <CheckoutPage />
    </div>

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-black dark:text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;

