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
  { name: "Kilifi", price: 800.0 },
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
  { name: "Mbita", price: 720.0 }
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [selectedLocation, setSelectedLocation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [phone, setPhone] = useState('');

  const shippingCost = () => {
    const match = locations.find((loc) => loc.name === selectedLocation);
    return match ? match.price : 0;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + shippingCost();

  const isFormValid = firstName && secondName && phone && selectedLocation;

  const handleCompleteOrder = () => {
    if (isFormValid) {
      console.log("Order Submitted", { firstName, secondName, phone, cartItems, selectedLocation, total });
      alert("Order submitted successfully!");
    }
  };

  const handleCancelOrder = () => {
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3ed8ff] via-[#7c4dff] to-[#a864fd] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-white text-[#7c4dff] font-semibold rounded">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3ed8ff] via-[#7c4dff] to-[#a864fd] p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg text-gray-800">
        <h1 className="text-3xl font-bold text-center text-[#7c4dff] mb-6">Rebel Radiance Checkout</h1>

        <div className="grid gap-4 mb-4">
          <input
            className="p-2 border border-gray-300 rounded placeholder-gray-500"
            type="text"
            placeholder="First Name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="p-2 border border-gray-300 rounded placeholder-gray-500"
            type="text"
            placeholder="Second Name*"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
          <input
            className="p-2 border border-gray-300 rounded placeholder-gray-500"
            type="text"
            placeholder="Phone Number*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">-- Select a location --</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc.name}>
              {loc.name} - Ksh {loc.price.toFixed(2)}
            </option>
          ))}
        </select>

        <div className="mb-4 text-sm">
          <p>Items: {totalItems}</p>
          <p>Subtotal: Ksh {subtotal.toFixed(2)}</p>
          <p>Shipping: Ksh {shippingCost().toFixed(2)}</p>
          <p className="font-bold text-lg">Total: Ksh {total.toFixed(2)}</p>
        </div>

        <button
          onClick={handleCompleteOrder}
          disabled={!isFormValid}
          className={`w-full py-2 mb-3 rounded text-white font-bold transition ${
            isFormValid ? 'bg-[#6a5acd] hover:bg-[#836fff]' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Complete Order
        </button>

        <button
          onClick={handleCancelOrder}
          className="w-full py-2 text-[#6a5acd] border border-[#6a5acd] rounded font-semibold hover:bg-[#6a5acd] hover:text-white transition"
        >
          Cancel Order & Return Home
        </button>
      </div>
    </div>
  );
};

export default Checkout;
