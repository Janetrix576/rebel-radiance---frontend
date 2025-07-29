import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCart } from '../context/CartContext';
import { closePaymentModal } from 'flutterwave-react-v3';

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
    if (step === 'processing') {
      timeoutId = setTimeout(() => {
        setStep('confirm');
        alert('The M-Pesa prompt timed out. Please check your phone and try again.');
      }, 15000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [step]);

  const shippingCost = locations.find((loc) => loc.name === formData.selectedLocation)?.price || 0;
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
    const currentOrderInfo = {
      ...formData,
      total: total,
      cartItems: cartItems
    };
    setOrderInfo(currentOrderInfo);
    setStep('confirm');
  };
  
  const handleConfirmPayment = async () => {
    if (paymentMethod === 'M-Pesa') {
      try {
        setStep('processing');
  
        const stkResponse = await fetch('https://rebel-radiance-backend.onrender.com/api/payment/stk-push/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: orderInfo.phone,
            amount: Math.round(orderInfo.total),
          }),
        });
  
        if (!stkResponse.ok) {
            const errorData = await stkResponse.json();
            console.error("STK Push failed:", errorData);
            alert('STK Push failed. Please check the phone number and try again.');
            setStep('confirm');
            return;
        }

        const stkData = await stkResponse.json();
        const checkoutRequestId = stkData.checkout_request_id;
  
        const pollPaymentStatus = async () => {
            if (step !== 'processing') return; 

            try {
                const res = await fetch(`https://rebel-radiance-backend.onrender.com/api/payment/status/${checkoutRequestId}/`);
                const statusData = await res.json();
    
                if (statusData.status === 'Success') {
                    setStep('receipt');
                    clearCart();
                } else if (statusData.status === 'Failed') {
                    alert('Payment failed or was cancelled.');
                    setStep('confirm');
                } else {
                    setTimeout(pollPaymentStatus, 5000);
                }
            } catch (err) {
                setTimeout(pollPaymentStatus, 5000);
            }
        };
        pollPaymentStatus();
      } catch (error) {
        alert('Something went wrong. Please try again.');
        setStep('confirm');
      }
    } else if (paymentMethod === 'Flutterwave') {
        if (!window.FlutterwaveCheckout) {
          alert('Flutterwave is not available. Please try another method.');
          return;
        }
  
        window.FlutterwaveCheckout({
          public_key: "FLWPUBK_TEST-06c114d02139f8475866917c8f566367-X",
          tx_ref: Date.now().toString(),
          amount: parseFloat(orderInfo.total),
          currency: "KES",
          payment_options: "card,mpesa,ussd",
          customer: {
            email: "customer@example.com",
            phone_number: orderInfo.phone,
            name: `${orderInfo.firstName} ${orderInfo.secondName}`,
          },
          customizations: {
            title: "Rebel Radiance",
            description: "Payment for exclusive merchandise",
          },
          callback: (response) => {
            closePaymentModal();
            setStep("receipt");
            clearCart();
          },
          onclose: () => {},
        });
    }
  };

  const reset = () => {
    setStep('checkout');
    setOrderInfo(null);
    setPaymentMethod('');
  };
  
  const renderContent = () => {
    if (cartItems.length === 0 && step !== 'receipt') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white shadow-lg rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
              <button onClick={() => navigate("/products")} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg">
                Continue Shopping
              </button>
            </div>
          </div>
        );
      }

    switch (step) {
      case 'checkout':
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg text-gray-800">
                    <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Checkout</h1>
                    <div className="space-y-4 mb-6">
                        <input name="firstName" className="w-full p-3 border border-gray-300 rounded-lg" type="text" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} />
                        <input name="secondName" className="w-full p-3 border border-gray-300 rounded-lg" type="text" placeholder="Second Name*" value={formData.secondName} onChange={handleInputChange} />
                        <input name="phone" className="w-full p-3 border border-gray-300 rounded-lg" type="tel" placeholder="Phone Number (e.g., 2547...)*" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <select name="selectedLocation" value={formData.selectedLocation} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg mb-6">
                        <option value="">-- Select Delivery Location --</option>
                        {locations.map((loc) => (
                        <option key={loc.name} value={loc.name}>
                            {loc.name} - Ksh {loc.price.toFixed(2)}
                        </option>
                        ))}
                    </select>
                    <div className="border-t border-gray-200 pt-4 mb-6 space-y-2 text-gray-600">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Order Summary</h3>
                        {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} (x{item.quantity})</span>
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
                    <button onClick={handleProceedToPayment} disabled={!isFormValid} className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>
                        Proceed to Payment
                    </button>
                </div>
            </div>
        );

    case 'confirm':
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 font-sans">
              <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Confirm Payment</h2>
              <div className="space-y-3 mb-6 text-sm text-gray-700">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p><strong>Name:</strong> {orderInfo.firstName} {orderInfo.secondName}</p>
                    <p><strong>Phone:</strong> {orderInfo.phone}</p>
                    <p><strong>Delivery Location:</strong> {orderInfo.selectedLocation}</p>
                </div>
                <div>
                  <label className="block text-indigo-600 mb-1 font-semibold">Select Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">-- Choose Payment Method --</option>
                    <option value="M-Pesa">M-Pesa STK Push</option>
                    <option value="Flutterwave">Flutterwave (Card, M-Pesa)</option>
                  </select>
                </div>
              </div>
              <div className="border-t pt-4 mb-4 text-sm text-gray-700">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Order Summary</h3>
                {orderInfo.cartItems.map((item, index) => (
                  <p key={index}>
                    {item.name} × {item.quantity} = <strong>Ksh {(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                ))}
                <p className="text-lg font-bold mt-2 border-t pt-2">
                  <strong>Total:</strong> Ksh {orderInfo.total.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleConfirmPayment}
                disabled={!paymentMethod}
                className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${paymentMethod ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Confirm & Pay
              </button>
              <button
                onClick={() => setStep('checkout')}
                className="w-full text-indigo-600 py-2 mt-2"
              >
                Back to Edit Details
              </button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white text-indigo-600 text-xl font-bold">
            <svg className="w-16 h-16 mb-4 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Processing {paymentMethod} payment...
            <p className="text-sm font-normal mt-2 text-gray-500">Please check your phone for a prompt.</p>
          </div>
        );

      case 'receipt':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-black">
            <div className="max-w-md bg-gray-50 p-8 rounded-lg shadow-lg w-full text-center">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">Payment Successful!</h2>
              <p className="text-gray-600 mt-2 mb-6">Your order has been confirmed.</p>
              <div className="border-t border-b py-4 space-y-1 text-left text-sm">
                {orderInfo.cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>Ksh {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                 <div className="flex justify-between font-bold border-t pt-2 mt-2">
                    <span>Total Paid:</span>
                    <span>Ksh {orderInfo.total.toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-4 text-sm"> Delivery to: <strong>{orderInfo.selectedLocation}</strong></p>
              <p className="text-sm"> Paid via: <strong>{paymentMethod}</strong></p>
              <button
                onClick={() => navigate('/')}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-bold"
              >
                Back to Home
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
      <Helmet><title>Checkout | Rebel Radiance</title></Helmet>
      <div className="min-h-screen bg-gray-100 text-black">{renderContent()}</div>
    </>
  );
}

export default CheckoutPage;