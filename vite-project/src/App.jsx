import React from "react";
import Account from "../components/Account";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <Account />
      </main>
      <Footer />
    </div>
  );
}

export default App;
