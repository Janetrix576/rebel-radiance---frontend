import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  console.log('CartItem is rendering with this item prop:', item);
  const { removeFromCart, updateQuantity } = useCart();
  const price = typeof item.price === 'number' ? item.price : 0;
  const itemTotal = price * (item.quantity || 1);

  return (
    <li className="py-6 flex">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image || 'https://via.placeholder.com/100'}
          alt={item.name}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name || 'Product Name'}</h3>
            <p className="ml-4">Ksh {itemTotal.toFixed(2)}</p>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {item.variantDescription && <p>{item.variantDescription}</p>}
            <p>Ksh {price.toFixed(2)} each</p>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 rounded">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
            <span className="px-3 text-gray-700">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
          </div>
          <div className="flex">
            <button
              onClick={() => removeFromCart(item.id)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;