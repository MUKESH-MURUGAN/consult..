import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-800">
        <div>
          <a href="tel:8122848612" className="text-blue-400 block hover:underline">
            8122848612
          </a>
          <a
            href="mailto:blackpekoetea@blackpekoeteafranchise.com"
            className="text-blue-400 block hover:underline"
          >
            blackpekoetea@blackpekoeteafranchise.com
          </a>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-2">ABOUT US</h3>
          <p className="text-gray-300">
            Welcome to Blackpekoe Tea, where every sip is a journey into the heart of premium tea craftsmanship.
            With over 200+ Franchise outlets worldwide, we are dedicated to bringing you the finest selection of
            teas that captivate the senses and elevate your tea-drinking experience.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-4 max-w-7xl mx-auto">
        <div className="text-gray-400 text-sm">
          © 2025 Blackpekoetea |{" "}
          <Link to="/sitemap" className="text-blue-400 hover:underline">
            Sitemap
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Follow us</span>
          <a
            href="https://facebook.com"
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
