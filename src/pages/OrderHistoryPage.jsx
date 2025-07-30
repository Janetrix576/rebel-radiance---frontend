import React, { useEffect, useState } from "react";
import api from '../utils/auth'; 
import { FaSearch, FaSyncAlt, FaHistory } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchOrderHistory = async () => {
        setLoading(true);
        try {
            const res = await api.get("/orders/history/"); 
            setOrders(res.data);
            setFilteredOrders(res.data);
        } catch (err) {
            console.error("Error fetching order history:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    useEffect(() => {
        let results = [...orders];
        const term = searchTerm.toLowerCase();

        if (term) {
            results = results.filter(order =>
                order.items.some(item =>
                    item.variant.product.name.toLowerCase().includes(term) ||
                    item.variant.name.toLowerCase().includes(term)
                )
            );
        }

        if (searchDate) {
            results = results.filter(order =>
                moment(order.created_at).isSame(searchDate, "day")
            );
        }
        setFilteredOrders(results);
    }, [searchTerm, searchDate, orders]);

    return (
        <div className="min-h-screen w-full bg-white text-gray-800 font-serif py-10 px-6 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold text-purple-600 flex items-center gap-3 mb-4 sm:mb-0">
                        <FaHistory />
                        My Orders
                    </h2>
                    <button
                        onClick={fetchOrderHistory}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 font-semibold shadow transition"
                    >
                        <FaSyncAlt className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by product name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="py-2 px-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    {loading ? (
                        <p className="text-center text-purple-600 font-semibold">Loading your orders...</p>
                    ) : filteredOrders.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">No matching orders found.</p>
                    ) : (
                        <motion.ul layout className="space-y-6">
                            <AnimatePresence>
                                {filteredOrders.map((order, index) => (
                                    <motion.li
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white border-l-4 border-purple-500 shadow-lg p-6 rounded-lg"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-bold text-lg">Order #{order.id}</p>
                                                <p className="text-sm text-gray-500">
                                                    {moment(order.created_at).format("MMMM Do YYYY, h:mm a")}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-xl text-gray-900">Ksh {order.total}</p>
                                                <p className={`text-sm font-semibold capitalize px-2 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-4">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex justify-between items-center py-2">
                                                    <p>{item.variant.product.name} ({item.variant.name}) x <span className="font-semibold">{item.quantity}</span></p>
                                                    <p className="text-gray-700">Ksh {item.price_at_purchase}</p>
                                                </div>
                                            ))}
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