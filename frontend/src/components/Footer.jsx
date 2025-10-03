import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'; // Import icons

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10 border-t border-gray-800"> {/* Increased padding */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> {/* Increased gap */}
          {/* Coffee & Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Coffee & Products</h3> {/* Increased margin */}
            <ul className="space-y-3"> {/* Increased spacing */}
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Our Coffee</a></li> {/* Increased font size */}
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Menu</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Merchandise</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Promotions</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">New Arrivals</a></li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">About Us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Our Story</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Our Mission</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Sustainability</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Locations</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors text-base">Contact Us</a></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Connect With Us</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors text-base">Nilasish</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors text-base">Aman</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors text-base">Nitish</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors text-base">Suchitha</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors text-base">Aryan</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Stay Brewed</h3>
            <p className="text-sm mb-6 text-gray-400">
              Subscribe to our newsletter for the latest updates on new products, offers, and events.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base" // Increased font size
              />
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base" // Increased font size
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-10"> {/* Increased margin */}
          <p className="text-sm mb-4 md:mb-0 text-gray-400">
            &copy; {new Date().getFullYear()} Coffee Shop Inventory. All rights reserved.
            <a href="#" className="text-yellow-400 hover:underline ml-2 text-base">Privacy Policy</a> {/* Increased font size */}
            <a href="#" className="text-yellow-400 hover:underline ml-2 text-base">Terms of Service</a>
            <a href="#" className="text-yellow-400 hover:underline ml-2 text-base">Cookie Settings</a>
          </p>
          <div className="flex space-x-6"> {/* Increased spacing */}
            <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={24} /></a> {/* Increased size */}
            <a href="#" className="hover:text-pink-400 transition-colors"><Instagram size={24} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
            <a href="#" className="hover:text-red-400 transition-colors"><Youtube size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
