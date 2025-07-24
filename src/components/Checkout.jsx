import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const locations = [
  { name: "Nairobi", price: 350 },
  { name: "Kisumu", price: 500 },
  { name: "Mombasa", price: 640 },
];

const Checkout = ({ onCompleteOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = [
    { title: 'Mkurugenzi T-Shirt', price: 1000, quantity: 1, size: 'L' },
    { title: 'Merch Hoodie', price: 2500, quantity: 1, size: 'XL' },
  ]; // hardcoded for now

  const [selectedLocation, setSelectedLocation] = useState('');

  const getShipping = () => {
    const match = locations.find((loc) => loc.name === selectedLocation);
    return match ? match.price : 0;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = getShipping();
  const total = subtotal + shipping;

  const handleContinue = () => {
    if (typeof onCompleteOrder === 'function') {
      onCompleteOrder({ cartItems, selectedLocation, total });
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white py-12 px-4">
      <div className="w-full sm:max-w-md bg-[#f7f7f7] mt-10 rounded-xl shadow-md p-6 font-sans">
        <button onClick={() => navigate("/")} className="flex items-center text-primary hover:text-red-700 text-sm mb-4">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <h1 className="text-2xl font-bold text-center text-primary mb-6">Checkout</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-primary mb-2">Your Items</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="mb-2 text-sm text-gray-800">
              {item.title} × {item.quantity} ({item.size || "N/A"}) @ Ksh {item.price} ={" "}
              <strong>Ksh {(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-primary mb-1">Select Delivery Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full border border-primary rounded-md p-2 text-primary"
          >
            <option value="">-- Select a location --</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc.name}>
                {loc.name} - Ksh {loc.price}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t pt-4 mb-6 text-sm text-gray-700">
          <h3 className="text-primary font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between mb-1"><span>Items:</span><span>{totalItems}</span></div>
          <div className="flex justify-between mb-1"><span>Subtotal:</span><span>Ksh {subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between mb-1"><span>Shipping:</span><span>Ksh {shipping.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-base"><span>Total:</span><span>Ksh {total.toFixed(2)}</span></div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedLocation}
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-red-700 transition mb-2"
        >
          Continue to Payment
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full text-primary py-2 rounded-md border border-primary text-sm"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;