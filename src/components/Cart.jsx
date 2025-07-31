import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa';

function Cart() {
  const { isCartOpen, toggleCart, cartItems, cartTotal, updateQuantity, removeFromCart, favorites, toggleFavorite } = useCart();
  const [activeTab, setActiveTab] = useState('cart');

  return (
    <>
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleCart} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-gray shadow-2xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} border-l-2 border-electric-purple`}>
        <div className="flex flex-col h-full text-white">
          <div className="flex justify-between items-center p-4 border-b border-light-gray/20">
            <h2 className="text-xl font-bold text-electric-blue text-shadow-glow">My Collection</h2>
            <button onClick={toggleCart} className="text-light-gray hover:text-white transition-colors"><FaTimes size={24} /></button>
          </div>
          <div className="border-b border-light-gray/20">
            <div className="flex">
              <button onClick={() => setActiveTab('cart')} className={`flex-1 p-4 font-semibold flex items-center justify-center gap-2 transition ${activeTab === 'cart' ? 'bg-electric-purple text-white' : 'bg-dark-gray hover:bg-dark-gray/50'}`}>
                <FaShoppingCart /> Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </button>
              <button onClick={() => setActiveTab('favorites')} className={`flex-1 p-4 font-semibold flex items-center justify-center gap-2 transition ${activeTab === 'favorites' ? 'bg-electric-purple text-white' : 'bg-dark-gray hover:bg-dark-gray/50'}`}>
                <FaHeart /> Favorites ({favorites.length})
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === 'cart' && (
              cartItems.length === 0 ? <p className="text-center text-light-gray mt-8">Your cart is empty.</p> :
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-light-gray/20" />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-light-gray">Ksh {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))} className="w-14 text-center border rounded bg-dark-bg border-light-gray/30 focus:ring-electric-blue focus:border-electric-blue" />
                      <button onClick={() => removeFromCart(item.id)} className="text-light-gray hover:text-red-500 transition-colors p-1"><FaTimes /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'favorites' && (
               favorites.length === 0 ? <p className="text-center text-light-gray mt-8">Your favorites list is empty.</p> :
               <div className="space-y-4">
                 {favorites.map(item => (
                   <div key={item.id} className="flex items-center space-x-4">
                     {/* --- THE FIX IS HERE --- */}
                     <img 
                       src={item.main_image || 'https://placehold.co/100x100/0D0C1D/B026FF?text=R'} 
                       alt={item.name} 
                       className="w-16 h-16 object-cover rounded-md border border-light-gray/20" 
                     />
                     <div className="flex-grow">
                       <p className="font-semibold">{item.name}</p>
                     </div>
                     <button onClick={() => toggleFavorite(item)} className="text-red-500 hover:text-red-400 p-1"><FaHeart /></button>
                   </div>
                 ))}
               </div>
            )}
          </div>
          {activeTab === 'cart' && cartItems.length > 0 && (
            <div className="p-4 border-t border-light-gray/20 bg-dark-bg">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span className="text-light-gray">Subtotal</span>
                <span className="text-white">Ksh {cartTotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={toggleCart} className="w-full bg-gradient-to-r from-electric-purple to-electric-blue text-white text-center py-3 rounded-lg font-bold hover:opacity-90 transition block">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;