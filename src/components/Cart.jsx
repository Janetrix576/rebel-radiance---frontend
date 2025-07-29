import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, removeFromCart, updateQuantity, isOpen, onClose }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[var(--electric-purple)]">Your Cart</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <div className="w-full flex justify-between items-center">
              <p className="text-lg font-semibold">
                Total: <span className="text-[var(--electric-purple)]">${total.toFixed(2)}</span>
              </p>
              <button
                disabled={cartItems.length === 0}
                className={`px-4 py-2 rounded-md text-white ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--electric-purple)] hover:bg-[var(--electric-purple-dark)]'}`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;