import React, { useState, useEffect } from "react";
import  api  from '../api';
import { FaHistory, FaSyncAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders/history/");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching order history:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="min-h-screen w-full text-white py-10 px-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-electric-purple text-shadow-glow flex items-center gap-3 mb-4 sm:mb-0">
            <FaHistory /> My Orders
          </h2>
          <button onClick={fetchOrderHistory} className="bg-electric-purple hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 font-semibold shadow transition">
            <FaSyncAlt className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        <div>
          {loading ? (
            <p className="text-center text-electric-blue font-semibold">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-light-gray mt-10">You have no past orders.</p>
          ) : (
            <motion.ul layout className="space-y-6">
              <AnimatePresence>
                {orders.map((order, index) => (
                  <motion.li key={order.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.05 }} className="bg-dark-gray border-l-4 border-electric-purple shadow-lg p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                      <div>
                        <p className="font-bold text-lg text-white">Order #{order.id}</p>
                        <p className="text-sm text-light-gray">{moment(order.created_at).format("MMMM Do YYYY, h:mm a")}</p>
                        <p className="text-sm text-light-gray">Status: <span className="font-semibold capitalize text-electric-blue">{order.status}</span></p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-xl text-white">Ksh {order.total}</p>
                        <p className="text-sm text-light-gray">Paid via {order.payment_method}</p>
                      </div>
                    </div>
                    <div className="border-t border-light-gray/20 pt-4 mt-4">
                      <h4 className="font-semibold mb-2 text-electric-blue">Items</h4>
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-1 text-sm">
                          <p className="text-slate-300">{item.variant.product.name} ({item.variant.name}) x <span className="font-semibold">{item.quantity}</span></p>
                          <p className="text-slate-400">Ksh {item.price_at_purchase}</p>
                        </div>
                      ))}
                      <div className="border-t border-light-gray/20 pt-4 mt-4">
                        <h4 className="font-semibold mb-2 text-electric-blue">Shipping Details</h4>
                        <p className="text-sm text-slate-300">{order.buyer_name}</p>
                        <p className="text-sm text-slate-300">{order.buyer_phone}</p>
                        <p className="text-sm text-slate-300">Delivering to {order.delivery_location}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryPage;