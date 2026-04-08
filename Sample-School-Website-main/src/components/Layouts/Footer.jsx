import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-gray-900 via-black to-gray-900 text-white mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm sm:text-lg">MM</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  M.M. Vidya Mandir
                </h1>
                <p className="text-xs text-gray-400">Primary School</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Nurturing young minds with excellence, values, and joy. Building tomorrow's leaders today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-amber-400 mb-4 sm:mb-6">Quick Links</h2>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm sm:text-base text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm sm:text-base text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-sm sm:text-base text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm sm:text-base text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-amber-400 mb-4 sm:mb-6">Our Services</h2>
            <ul className="space-y-2 sm:space-y-3 text-gray-300">
              <li className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer">Primary Education</li>
              <li className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer">Extra Curricular</li>
              <li className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer">Sports & Games</li>
              <li className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer">Art & Craft</li>
              <li className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer">Music & Dance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-amber-400 mb-4 sm:mb-6">Contact Info</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0 text-sm" />
                <div>
                  <p className="text-sm sm:text-base text-gray-300">123 Education Street</p>
                  <p className="text-sm sm:text-base text-gray-300">Pune, Maharashtra 411001</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-400 shrink-0 text-sm" />
                <p className="text-sm sm:text-base text-gray-300">+91 98765 43210</p>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-amber-400 shrink-0 text-sm mt-1" />
                <p className="text-sm sm:text-base text-gray-300 break-all">info@mmvidyamandir.edu.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} M.M. Vidya Mandir Primary School. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;