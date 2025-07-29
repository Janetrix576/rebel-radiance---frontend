import React, { useState } from 'react';
import Checkout from '../src/components/Checkout';
import { Helmet } from 'react-helmet';
import { closePaymentModal } from 'flutterwave-react-v3';

function CheckoutPage() {
  const [orderInfo, setOrderInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('checkout');

  const handleOrderComplete = (info) => {
    setOrderInfo(info);
    setStep('confirm');
  };

  const handleConfirmPayment = async () => {
    if (paymentMethod === 'M-Pesa') {
      try {
        setStep('processing');

        const stkResponse = await fetch('http://127.0.0.1:8000/api/payment/stk-push/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone_number: phone,
            amount: parseInt(orderInfo.total),
          }),
        });

        const stkData = await stkResponse.json();
        if (!stkData.checkout_request_id) {
          alert('STK Push failed.');
          setStep('confirm');
          return;
        }

        const checkoutRequestId = stkData.checkout_request_id;

        const pollPaymentStatus = async () => {
          try {
            const res = await fetch(`http://127.0.0.1:8000/api/payment/status/${checkoutRequestId}/`);
            const statusData = await res.json();

            if (statusData.status === 'Success') {
              setStep('receipt');
            } else if (statusData.status === 'Failed') {
              alert('Payment failed or was cancelled.');
              setStep('confirm');
            } else {
              setTimeout(pollPaymentStatus, 3000);
            }
          } catch (err) {
            setTimeout(pollPaymentStatus, 3000);
          }
        };

        pollPaymentStatus();
      } catch (error) {
        alert('Something went wrong. Try again.');
        setStep('confirm');
      }
    } else if (paymentMethod === 'Flutterwave') {
      if (!window.FlutterwaveCheckout) {
        alert('Flutterwave not loaded.');
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
          phone_number: phone || "254700000000",
          name: "Rebel Radiance Customer",
        },
        customizations: {
          title: "Rebel Radiance",
          description: "Payment for merch",
        },
        callback: (response) => {
          closePaymentModal();
          setStep("receipt");
        },
        onclose: () => {
          console.log("🛑 Flutterwave modal closed");
        },
      });
    } else {
      setStep('processing');
      setTimeout(() => setStep('receipt'), 3000);
    }
  };

  const reset = () => {
    setStep('checkout');
    setOrderInfo(null);
    setPaymentMethod('');
    setPhone('');
  };

  const renderContent = () => {
    switch (step) {
      case 'checkout':
        return <Checkout onCompleteOrder={handleOrderComplete} />;

      case 'confirm':
        return (
          <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 font-sans">
              <h2 className="text-2xl font-bold text-center text-[#900000] mb-6">Confirm Payment</h2>

              <div className="space-y-3 mb-6 text-sm text-gray-700">
                <div>
                  <strong className="text-[#900000]">Delivery:</strong> {orderInfo.selectedLocation}
                </div>

                <div>
                  <label className="block text-[#900000] mb-1">Select Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#900000] text-[#900000]"
                  >
                    <option value="">-- Choose Payment Method --</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Flutterwave">Flutterwave</option>
                   
                  </select>
                </div>

                {paymentMethod === 'M-Pesa' && (
                  <div>
                    <label className="block text-[#900000] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+2547..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border p-2 rounded text-[#900000] bg-white placeholder-red-400"
                    />
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-4 text-sm text-gray-700">
                {orderInfo.cartItems.map((item, index) => (
                  <p key={index}>
                    {item.title} × {item.quantity} @ Ksh {item.price} = <strong>Ksh {(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                ))}
                <p className="mt-2">
                  <strong>Shipping:</strong> Ksh {orderInfo.total - orderInfo.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                </p>
                <p className="text-lg font-bold mt-2">
                  <strong>Total:</strong> Ksh {orderInfo.total.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleConfirmPayment}
                disabled={
                  !paymentMethod ||
                  (paymentMethod === 'M-Pesa' && !phone)
                }
                className="w-full bg-[#900000] text-white py-2 rounded hover:bg-red-700 transition mb-2"
              >
                Confirm & Pay
              </button>

              <button
                onClick={reset}
                className="w-full text-[#900000] py-2 border border-[#900000] rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      case 'processing':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#900000] text-xl font-bold animate-pulse">
            <svg className="w-12 h-12 mb-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#900000" strokeWidth="4"></circle>
              <path className="opacity-75" fill="#900000" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Processing {paymentMethod} payment...
          </div>
        );

      case 'receipt':
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-black">
            <div className="max-w-md bg-gray-100 p-6 rounded-lg shadow-lg w-full animate-fade-in">
              <div className="text-center mb-4">
                <svg className="w-12 h-12 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-xl font-bold text-[#900000] mt-2">Payment Successful!</h2>
              </div>
              {orderInfo.cartItems.map((item, index) => (
                <div key={index} className="text-sm">
                  {item.title} × {item.quantity} = Ksh {(item.price * item.quantity).toFixed(2)}
                </div>
              ))}
              <p className="mt-2 text-sm">📍 Delivery: <strong>{orderInfo.selectedLocation}</strong></p>
              <p className="text-sm">💳 Paid with: <strong>{paymentMethod}</strong></p>
              <p className="text-sm mt-2 font-semibold">💰 Total: Ksh {orderInfo.total.toFixed(2)}</p>

              <button
                onClick={reset}
                className="w-full mt-4 bg-[#900000] text-white py-2 rounded hover:bg-red-700 transition"
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
      <Helmet><title>Checkout</title></Helmet>
      <div className="min-h-screen bg-white text-black">{renderContent()}</div>
    </>
  );
}

export default CheckoutPage;