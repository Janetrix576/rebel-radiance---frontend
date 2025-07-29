import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaSyncAlt, FaHistory } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

function Account() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://rebel-radiance-backend.onrender.com/api/history/");
      setHistory(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    let results = [...history];

    const term = searchTerm.toLowerCase();
    if (term) {
      results = results.filter((item) =>
        item.title.toLowerCase().includes(term)
      );
    }

    if (searchDate) {
      results = results.filter((item) =>
        moment(item.date).isSame(searchDate, "day")
      );
    }

    setFiltered(results);
  }, [searchTerm, searchDate, history]);

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 font-serif py-20 px-6 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#BF00FF] flex items-center gap-3 mb-4 sm:mb-0">
            <FaHistory />
            Your History
          </h2>
          <button
            onClick={fetchHistory}
            className="bg-[#BF00FF] hover:bg-purple-700 text-white px-5 py-2 rounded-md flex items-center gap-2 font-semibold shadow"
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF00FF]"
            />
          </div>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#BF00FF]"
          />
        </div>

        <div>
          {loading ? (
            <p className="text-center text-[#BF00FF] font-semibold">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No matching history found.</p>
          ) : (
            <motion.ul
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filtered.map((entry, index) => (
                  <motion.li
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white border-l-4 border-[#BF00FF] shadow-md p-4 rounded-lg"
                  >
                    <p className="font-semibold text-lg mb-1">{entry.title}</p>
                    <p className="text-gray-600 text-sm">{entry.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {moment(entry.date).fromNow()} • {moment(entry.date).format("MMM D, YYYY")}
                    </p>
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

export default Account;