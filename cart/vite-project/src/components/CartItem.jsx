import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded mr-4">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <p className="w-20 text-right font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-4 text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;