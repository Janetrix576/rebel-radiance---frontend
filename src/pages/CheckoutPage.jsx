import React, { useState } from 'react';
import Checkout from '../components/Checkout';
import { Helmet } from "react-helmet";

function CheckoutPage() {

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="min-h-screen bg-white text-black dark:text-white">
        <Checkout />
      </div>
    </>
  );
}

export default CheckoutPage;
