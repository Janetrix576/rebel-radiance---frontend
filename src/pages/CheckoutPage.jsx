import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../context/CartContext';
import { closePaymentModal } from 'flutterwave-react-v3';

const locations = [
  { name: "Nairobi", price: 1.0 }, { name: "Ngong", price: 350.0 }, { name: "Kikuyu", price: 350.0 },
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

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState('checkout');
  const [orderInfo, setOrderInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    phone: '',
    selectedLocation: ''
  });

  useEffect(() => {
    let timeoutId = null;
    if (step === 'processing' && paymentMethod === 'M-Pesa') {
      timeoutId = setTimeout(() => {
        setStep('confirm');
        alert('The M-Pesa prompt timed out. Please try again.');
      }, 30000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [step, paymentMethod]);

  const shippingCost = locations.find(loc => loc.name === formData.selectedLocation)?.price || 0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;
  const isFormValid = formData.firstName && formData.secondName && formData.phone && formData.selectedLocation;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = () => {
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }
    const currentOrderInfo = { ...formData, total, cartItems };
    setOrderInfo(currentOrderInfo);
    setStep('confirm');
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethod) return;

    if (paymentMethod === 'M-Pesa') {
      const phoneRegex = /^2547\d{8}$/;
      if (!phoneRegex.test(orderInfo.phone)) {
        alert('Enter a valid phone number: 2547XXXXXXXX');
        return;
      }

      try {
        setStep('processing');
        const stkResponse = await fetch('https://rebel-radiance-backend.onrender.com/api/payments/stk-push/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: orderInfo.phone,
            amount: Math.round(orderInfo.total),
            order_details: orderInfo
          })
        });

        if (!stkResponse.ok) throw new Error('Payment initiation failed');
        const stkData = await stkResponse.json();
        const { checkout_request_id } = stkData;
        if (!checkout_request_id) throw new Error('Invalid response from server');

        let attempts = 0;
        const poll = async () => {
          if (step !== 'processing') return;
          if (attempts > 10) {
            alert('Payment timed out. Please try again.');
            setStep('confirm');
            return;
          }

          try {
            const res = await fetch(`https://rebel-radiance-backend.onrender.com/api/payments/status/${checkout_request_id}/`);
            const statusData = await res.json();

            if (statusData.status === 'Completed') {
              setStep('receipt');
              clearCart();
            } else if (statusData.status === 'Failed' || statusData.status === 'Cancelled') {
              alert('Payment failed or was cancelled.');
              setStep('confirm');
            } else {
              attempts++;
              setTimeout(poll, 5000);
            }
          } catch (err) {
            attempts++;
            setTimeout(poll, 5000);
          }
        };

        poll();
      } catch (error) {
        alert('Failed to initiate M-Pesa. Please try again.');
        setStep('confirm');
      }
    }

    if (paymentMethod === 'Flutterwave') {
      if (!window.FlutterwaveCheckout) {
        alert('Payment gateway not loaded');
        return;
      }

      window.FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-06c114d02139f8475866917c8f566367-X",
        tx_ref: Date.now().toString(),
        amount: parseFloat(orderInfo.total),
        currency: "KES",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: "customer@example.com",
          phone_number: orderInfo.phone,
          name: `${orderInfo.firstName} ${orderInfo.secondName}`
        },
        customizations: {
          title: "Rebel Radiance",
          description: "Payment for merchandise"
        },
        callback: (response) => {
          if (response.status === "successful") {
            closePaymentModal();
            setStep("receipt");
            clearCart();
          } else {
            closePaymentModal();
            alert("Payment was not completed.");
            setStep("confirm");
          }
        },
        onclose: () => {
          setStep("confirm");
        }
      });
    }
  };

  const renderContent = () => {
    if (cartItems.length === 0 && step !== 'receipt') {
      return (
        <div className="min-h-screen bg-dark-bg text-white p-6">
          <div className="text-center p-8 bg-gradient-to-br from-electric-purple via-deep-purple to-dark-bg border border-neon-blue shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-neon-blue">Your Cart is Empty</h2>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-electric-blue hover:bg-neon-blue text-white font-semibold rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      );
    }

    switch (step) {
      case 'checkout':
        return (
          <div className="flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-electric-purple via-deep-purple to-dark-bg border border-neon-blue rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <h1 className="text-3xl font-bold text-center mb-6 text-neon-blue">Shipping Details</h1>
              <div className="space-y-4 mb-6">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-bg border border-neon-blue text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-electric-blue"
                />
                <input
                  name="secondName"
                  type="text"
                  placeholder="Second Name*"
                  value={formData.secondName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-bg border border-neon-blue text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-electric-blue"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number (e.g., 2547...)*"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-bg border border-neon-blue text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-electric-blue"
                />
              </div>
              <select
                name="selectedLocation"
                value={formData.selectedLocation}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-bg border border-neon-blue text-white rounded-lg mb-6"
              >
                <option value="">-- Select Delivery Location --</option>
                {locations.map(loc => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name} - Ksh {loc.price.toFixed(2)}
                  </option>
                ))}
              </select>
              <div className="border-t border-gray-700 pt-4 mb-6 space-y-2 text-white">
                <h3 className="text-xl font-bold text-neon-blue mb-3">Order Summary</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-200">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>Ksh {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
                  <span>Subtotal:</span>
                  <span>Ksh {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Ksh {shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-2 mt-2">
                  <span>Total:</span>
                  <span>Ksh {total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleProceedToPayment}
                disabled={!isFormValid}
                className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${
                  isFormValid ? 'bg-electric-blue hover:bg-neon-blue' : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-gradient-to-br from-electric-purple via-deep-purple to-dark-bg border border-neon-blue rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-center text-neon-blue mb-6">Confirm Payment</h2>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-dark-bg border border-electric-blue rounded-lg text-sm text-white">
                  <p><strong>Name:</strong> {orderInfo.firstName} {orderInfo.secondName}</p>
                  <p><strong>Phone:</strong> {orderInfo.phone}</p>
                  <p><strong>Delivery:</strong> {orderInfo.selectedLocation}</p>
                </div>
                <div>
                  <label className="block text-electric-blue mb-1 font-semibold">Select Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 bg-dark-bg border border-neon-blue text-white rounded-lg"
                  >
                    <option value="">-- Choose Payment Method --</option>
                    <option value="M-Pesa">M-Pesa STK Push</option>
                    <option value="Flutterwave">Flutterwave (Card, M-Pesa)</option>
                  </select>
                </div>
              </div>
              <div className="border-t pt-4 mb-4 font-bold text-lg text-white">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>Ksh {orderInfo.total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleConfirmPayment}
                disabled={!paymentMethod}
                className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${
                  paymentMethod ? 'bg-electric-blue hover:bg-neon-blue' : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Confirm & Pay
              </button>
              <button
                onClick={() => setStep('checkout')}
                className="w-full text-electric-blue hover:text-neon-blue py-2 mt-2 transition"
              >
                Back to Edit Details
              </button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center py-16 text-neon-blue">
            <svg className="w-16 h-16 mb-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 className="text-2xl font-bold">Processing Payment...</h2>
            <p className="mt-2 text-gray-400">Please check your phone for a prompt.</p>
          </div>
        );

      case 'receipt':
        return (
          <div className="flex flex-col items-center justify-center p-4">
            <div className="max-w-md bg-gradient-to-br from-deep-purple to-dark-bg p-8 rounded-lg border border-neon-blue shadow-lg w-full text-center">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-neon-blue mt-2">Payment Successful!</h2>
              <p className="text-gray-400 mt-2 mb-6">Your order has been confirmed.</p>
              <button
                onClick={() => navigate('/my-orders')}
                className="w-full mt-6 bg-electric-blue text-white py-3 rounded-lg hover:bg-neon-blue transition font-bold"
              >
                View My Orders
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Rebel Radiance</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {renderContent()}
      </div>
    </>
  );
}

export default CheckoutPage;
