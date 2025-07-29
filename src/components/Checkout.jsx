import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const locations = [
  { name: "Nairobi", price: 350.0 }, { name: "Ngong", price: 350.0 }, { name: "Kikuyu", price: 350.0 },
  { name: "Athi River", price: 360.0 }, { name: "Kitengela", price: 360.0 }, { name: "Nakuru", price: 360.0 },
  { name: "Ruiru", price: 360.0 }, { name: "Thika", price: 360.0 }, { name: "Juja", price: 380.0 },
  { name: "Karatina", price: 400.0 }, { name: "Kerugoya", price: 400.0 }, { name: "Nyeri", price: 420.0 },
  { name: "Machakos", price: 420.0 }, { name: "Muranga", price: 420.0 }, { name: "Narok", price: 420.0 },
  { name: "Eldoret", price: 450.0 }, { name: "Kitui", price: 450.0 }, { name: "Meru", price: 480.0 },
  { name: "Kericho", price: 480.0 }, { name: "Kakamega", price: 480.0 }, { name: "Kisii", price: 500.0 },
  { name: "Kisumu", price: 500.0 }, { name: "Kitale", price: 520.0 }, { name: "Nanyuki", price: 520.0 },
  { name: "Bungoma", price: 600.0 }, { name: "Migori", price: 600.0 }, { name: "Voi", price: 600.0 },
  { name: "Mombasa", price: 640.0 }, { name: "Isiolo", price: 650.0 }, { name: "Busia", price: 660.0 },
  { name: "Homabay", price: 700.0 }, { name: "Malindi", price: 840.0 }, { name: "Lamu", price: 2050.0 },
  { name: "Lodwar", price: 2050.0 },

];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [selectedLocation, setSelectedLocation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phone, setPhone] = useState('');
  const shippingCost = locations.find((loc) => loc.name === selectedLocation)?.price || 0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shippingCost;

  const isFormValid = firstName && secondName && phone && selectedLocation;

  const handleCompleteOrder = async () => {
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderData = {
      customer_name: `${firstName} ${secondName}`,
      customer_email: "customer@example.com",
      phone_number: phone,
      delivery_location: selectedLocation,
      items: cartItems.map(item => ({
        variant_id: item.variant_id, 
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: total,
    };

    try {
      const response = await fetch("https://rebel-radiance-backend.onrender.com/api/orders/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order submitted successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Failed to submit order: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("A server error occurred. Please ensure your backend is running and try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <button onClick={() => navigate("/")} className="px-6 py-2 bg-gradient-to-r from-[#B026FF] to-[#00F0FF] text-white font-semibold rounded-full">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg text-gray-800 font-sans">
        <h1 className="text-4xl font-black text-center mb-6" style={{ background: 'linear-gradient(90deg, #B026FF, #00F0FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Checkout
        </h1>

        <div className="space-y-4 mb-6">
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition" type="text" placeholder="First Name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition" type="text" placeholder="Second Name*" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
          <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition" type="tel" placeholder="Phone Number*" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-[#7C3AED] focus:outline-none transition">
          <option value="">-- Select Delivery Location --</option>
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name} - Ksh {loc.price.toFixed(2)}
            </option>
          ))}
        </select>

        <div className="border-t border-gray-200 pt-4 mb-6 space-y-2 text-gray-600">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Order Summary</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.title} (x{item.quantity})</span>
              <span>Ksh {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2 mt-2">
            <span>Subtotal:</span>
            <span>Ksh {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Ksh {shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2 mt-2">
            <span>Total:</span>
            <span>Ksh {total.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={handleCompleteOrder} disabled={!isFormValid} className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 ${isFormValid ? 'bg-gradient-to-r from-[#B026FF] to-[#00F0FF] hover:scale-105' : 'bg-gray-400 cursor-not-allowed'}`}>
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
