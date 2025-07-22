import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await api.fetchProductDetails(slug);
        setProduct(response);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) getProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen text-center py-20 text-white bg-gradient-to-br from-black via-purple-900 to-cyan-900">
        <p className="text-2xl font-semibold">Loading Radiance...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen text-center py-20 text-white bg-gradient-to-br from-black via-purple-900 to-cyan-900">
        <h2 className="text-4xl font-bold mb-4" style={{ textShadow: '0 0 15px rgba(176, 38, 255, 0.6)' }}>
          Product Not Found
        </h2>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-[#B026FF] to-[#00F0FF] rounded-full font-semibold hover:shadow-lg hover:shadow-[#00F0FF]/30 transition-all duration-300 transform hover:scale-105"
        >
        Back to Rebel Radiance
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-cyan-900 text-slate-100 py-12 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, #B026FF 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, #00F0FF 0%, transparent 40%)
          `,
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 hover:from-purple-500/50 hover:to-cyan-500/50 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-0.5"
          >
            <span className="group-hover:rotate-12 transition-transform duration-200">←</span>
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.image}
                  alt={img.alt_text || product.name}
                  className="w-full rounded-2xl shadow-2xl border border-cyan-500/30 hover:shadow-[#B026FF]/40 transition-shadow duration-500 object-cover"
                />
              ))
            ) : (
              <div
                className="w-full h-80 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold"
                style={{
                  textShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                No Image
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <h1
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{
                background: 'linear-gradient(90deg, #B026FF, #00F0FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(176, 38, 255, 0.4)',
              }}
            >
              {product.name}
            </h1>

            <p className="text-xl text-cyan-300 font-medium">{product.category?.name || 'Uncategorized'}</p>

            <p className="text-slate-300 leading-relaxed text-lg">{product.description}</p>
            <div className="mt-10">
              <h3
                className="text-2xl font-bold mb-5"
                style={{
                  background: 'linear-gradient(90deg, #B026FF, #00F0FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Available Variants
              </h3>

              <div className="space-y-5">
                {product.variants && product.variants.length > 0 ? (
                  product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
                    >
                      <div className="flex flex-wrap gap-2 mb-4">
                        {variant.attributes.map((attr, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-[#B026FF]/80 to-[#00F0FF]/80 text-white text-sm font-semibold rounded-full shadow-sm"
                          >
                            {attr.attribute}: <strong>{attr.value}</strong>
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-white">
                        <span className="text-lg font-bold">Ksh {variant.price}</span>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            variant.stock_quantity > 10
                              ? 'bg-green-600/50'
                              : variant.stock_quantity > 0
                              ? 'bg-yellow-600/50'
                              : 'bg-red-600/50'
                          }`}
                        >
                          {variant.stock_quantity > 0
                            ? `In Stock: ${variant.stock_quantity}`
                            : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">No variants available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;