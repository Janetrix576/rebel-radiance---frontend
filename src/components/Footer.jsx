import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#BF00FF] to-[#660066] text-white font-serif w-full border-t-2 shadow-inner relative">
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center text-center space-y-2">
        <h3 className="text-lg font-bold hover:underline">Contact Us</h3>
        <p className="text-sm hover:underline">Call, Text or WhatsApp us on,</p>
        <p className="font-semibold text-sm hover:underline">+254 716 265 661</p>
        <p className="text-sm">
          Email:{" "}
          <a
            href="mailto:janetrix.gicangiru@student.moringaschool.com"
            className="hover:underline"
          >
            janetrix.gicangiru@student.moringaschool.com
          </a>
        </p>
      </div>

      <div className="border-t border-purple-900" />

      <div className="text-sm text-white px-4 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Rebel Radiance.</p>
      </div>

      <a
        href="https://wa.me/254717825883"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-[#9900CC] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl"
      >
        <FaWhatsapp className="text-lg" /> Chat with Us
      </a>
    </footer>
  );
}

export default Footer;