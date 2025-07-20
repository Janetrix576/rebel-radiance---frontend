import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const locations = [
  { name: "Isebania", price: 740.0 },
  { name: "Kehancha", price: 740.0 },
  { name: "Garissa", price: 750.0 },
  { name: "Kendubay", price: 750.0 },
  { name: "Rachuonyo", price: 750.0 },
  { name: "Diani", price: 770.0 },
  { name: "Kapenguria", price: 780.0 },
  { name: "Klifi", price: 800.0 },
  { name: "Wundanyi", price: 800.0 },
  { name: "Malindi", price: 840.0 },
  { name: "Mwatate", price: 840.0 },
  { name: "Taveta", price: 850.0 },
  { name: "Watamu", price: 850.0 },
  { name: "Marasbit", price: 950.0 },
  { name: "Maralal", price: 1100.0 },
  { name: "Lamu", price: 2050.0 },
  { name: "Lodwar", price: 2050.0 },
  { name: "Lokichogio", price: 2850.0 },
  { name: "Kiganjo", price: 410.0 },
  { name: "Kutus", price: 410.0 },
  { name: "Mukurweini", price: 410.0 },
  { name: "Mwea", price: 410.0 },
  { name: "Chuka", price: 420.0 },
  { name: "Embu", price: 420.0 },
  { name: "Isinya", price: 420.0 },
  { name: "Kajiado", price: 420.0 },
  { name: "Kangema", price: 420.0 },
  { name: "Machakos", price: 420.0 },
  { name: "Matuu", price: 420.0 },
  { name: "Muranga", price: 420.0 },
  { name: "Murarandia", price: 420.0 },
  { name: "Narok", price: 420.0 },
  { name: "Nyeri", price: 420.0 },
  { name: "Orhaya", price: 420.0 },
  { name: "Runyenjes", price: 420.0 },
  { name: "Tala", price: 420.0 },
  { name: "Eldoret", price: 450.0 },
  { name: "Bungoma", price: 600.0 },
  { name: "Chwele", price: 600.0 },
  { name: "Keroka", price: 600.0 },
  { name: "Kilgoris", price: 600.0 },
  { name: "Kimilli", price: 600.0 },
  { name: "Lugari", price: 600.0 },
  { name: "Malaba", price: 600.0 },
  { name: "Migori", price: 600.0 },
  { name: "Mitto Andei", price: 600.0 },
  { name: "Mumias", price: 600.0 },
  { name: "Mwala", price: 600.0 },
  { name: "Ogembo", price: 600.0 },
  { name: "Oyugis", price: 600.0 },
  { name: "Rongo", price: 600.0 },
  { name: "Voi", price: 600.0 },
  { name: "Webuye", price: 600.0 },
  { name: "Wote", price: 600.0 },
  { name: "Kapsabet", price: 620.0 },
  { name: "Kikuyu", price: 350.0 },
  { name: "Nairobi", price: 350.0 },
  { name: "Ngong", price: 350.0 },
  { name: "Tongata Rongai", price: 350.0 },
  { name: "Athi River", price: 360.0 },
  { name: "Kitengela", price: 360.0 },
  { name: "Makuyu", price: 360.0 },
  { name: "Nakuru", price: 360.0 },
  { name: "Ruiru", price: 360.0 },
  { name: "Sabasaba", price: 360.0 },
  { name: "Thika", price: 360.0 },
  { name: "Juja", price: 380.0 },
  { name: "Engineer", price: 400.0 },
  { name: "Kagio", price: 400.0 },
  { name: "Kangundo", price: 400.0 },
  { name: "Karatina", price: 400.0 },
  { name: "Kerugoya", price: 400.0 },
  { name: "Kitui", price: 450.0 },
  { name: "Turbo", price: 450.0 },
  { name: "Makutano", price: 460.0 },
  { name: "Nkubu", price: 460.0 },
  { name: "Eldama Ravine", price: 470.0 },
  { name: "Chogoria", price: 480.0 },
  { name: "Kakamega", price: 480.0 },
  { name: "Kericho", price: 480.0 },
  { name: "Mbale", price: 480.0 },
  { name: "Meru", price: 480.0 },
  { name: "Molo", price: 480.0 },
  { name: "Njoro", price: 480.0 },
  { name: "Nyahuuru", price: 480.0 },
  { name: "Oikalau", price: 480.0 },
  { name: "Sabatia", price: 480.0 },
  { name: "Sagana", price: 480.0 },
  { name: "Bomet", price: 500.0 },
  { name: "Kisii", price: 500.0 },
  { name: "Kisumu", price: 500.0 },
  { name: "Litein", price: 500.0 },
  { name: "Londiani", price: 500.0 },
  { name: "Maseno", price: 500.0 },
  { name: "Masii", price: 500.0 },
  { name: "Nyamira", price: 500.0 },
  { name: "Sotik", price: 500.0 },
  { name: "Burnt Forest", price: 520.0 },
  { name: "Kitale", price: 520.0 },
  { name: "Nanyuki", price: 520.0 },
  { name: "Naromoru", price: 520.0 },
  { name: "Timau", price: 520.0 },
  { name: "Moï's Bridge", price: 530.0 },
  { name: "Mwingi", price: 550.0 },
  { name: "Email", price: 580.0 },
  { name: "Kabarnet", price: 580.0 },
  { name: "Kibwezi", price: 580.0 },
  { name: "Makindu", price: 580.0 },
  { name: "Sultan Hamud", price: 580.0 },
  { name: "Nandi Hills", price: 620.0 },
  { name: "Ahero", price: 640.0 },
  { name: "Bondo", price: 640.0 },
  { name: "Mariakani", price: 640.0 },
  { name: "Mombasa", price: 640.0 },
  { name: "Mtwapa", price: 640.0 },
  { name: "Isiolo", price: 650.0 },
  { name: "Maua", price: 650.0 },
  { name: "Siaya", price: 650.0 },
  { name: "Ugunja", price: 650.0 },
  { name: "Busia", price: 660.0 },
  { name: "Luanda", price: 660.0 },
  { name: "Muhoroni", price: 660.0 },
  { name: "Nambale", price: 670.0 },
  { name: "Oloitoktok", price: 670.0 },
  { name: "Baraton", price: 700.0 },
  { name: "Homabay", price: 700.0 },
  { name: "Nzoia", price: 710.0 },
  { name: "Mbita", price: 720.0 },
];

const Checkout = ({ onCompleteOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [selectedLocation, setSelectedLocation] = useState('');

  const shippingCost = () => {
    const match = locations.find((loc) => loc.name === selectedLocation);
    return match ? match.price : 0;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shippingCost();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-serif text-[#900000] mb-4">Your cart is empty</h2>
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-[#900000] text-white rounded hover:bg-red-700">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-12 px-4">
      <div className="w-full sm:max-w-md bg-white mt-10 rounded-lg shadow-lg p-6 font-serif">
        <button onClick={() => navigate("/")} className="flex items-center text-[#900000] hover:text-red-700 transition text-sm mb-4">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <h1 className="text-2xl font-bold text-center text-[#900000] mb-6">Mkurugenzi Merche</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#900000]">Your Items</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="mb-2 text-sm text-gray-700">
                {item.title} × {item.quantity} 
                <span className="text-gray-600">
                  {" "}({item.size || "N/A"})
                </span> 
                @ Ksh {item.price.toFixed(2)} ={" "}
                <span className="font-semibold">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

        </div>

        <div className="mb-6">
          <label htmlFor="location" className="block text-[#900000] mb-1">
            Select Delivery Location:
          </label>
          <select id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full border border-[#900000] rounded-md p-2 text-[#900000] bg-white">
            <option value="">-- Select a location --</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc.name}>
                {loc.name} - Ksh {loc.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t pt-4 mb-6 text-sm text-gray-700">
          <h3 className="text-[#900000] font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between mb-1">
            <span>Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span>
            <span>Ksh {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Shipping:</span>
            <span>Ksh {shippingCost().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Total:</span>
            <span>Ksh {total.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={() => onCompleteOrder && selectedLocation && onCompleteOrder({ cartItems, selectedLocation, total })}
         disabled={!selectedLocation || cartItems.length === 0} className="w-full bg-[#900000] text-white font-semibold py-2 rounded-md hover:bg-red-700 transition mb-2">
          Complete Order
        </button>

        <button onClick={() => navigate("/")} className="w-full text-[#900000] py-2 rounded-md border border-[#800000] transition text-sm">
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
