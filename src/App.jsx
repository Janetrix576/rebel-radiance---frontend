import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:text-white">
      <Routes>
        {/* ✅ Only valid route */}
        <Route path="/checkoutpage" element={<CheckoutPage />} />

        {/* ✅ Redirect unknown routes (including "/") to /checkoutpage */}
        <Route path="*" element={<Navigate to="/checkoutpage" replace />} />
      </Routes>
    </div>
  );
}

export default App;
