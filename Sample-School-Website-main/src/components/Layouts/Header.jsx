import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-linear-to-r from-black via-gray-900 to-black text-white px-4 py-4 sticky top-0 z-50 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm md:text-lg">MM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                M.M. Vidya Mandir
              </h1>
              <p className="text-xs text-gray-300">Primary School</p>
            </div>
          </div>

          {/* DESKTOP NAVBAR */}
          <nav className="hidden lg:flex items-center gap-8 text-base font-medium">
            <Link to="/" className="hover:text-amber-400 hover:underline transition-colors duration-300 px-2 py-1">
              Home
            </Link>
            <Link to="/about" className="hover:text-amber-400 hover:underline transition-colors duration-300 px-2 py-1">
              About
            </Link>
            <Link to="/academics" className="hover:text-amber-400 hover:underline transition-colors duration-300 px-2 py-1">
              Academics
            </Link>
            <Link to="/admissions" className="hover:text-amber-400 hover:underline transition-colors duration-300 px-2 py-1">
              Admissions
            </Link>
            <Link to="/gallery" className="hover:text-amber-400 hover:underline transition-colors duration-300 px-2 py-1">
              Gallery
            </Link>
            <Link to="/contact" className="hover:text-amber-400 hover:underline transition-colors duration-300 px-2 py-1">
              Contact
            </Link>
          </nav>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard" 
                  className="bg-amber-400 text-black px-4 py-2 rounded-full hover:bg-amber-500 transition-all duration-300 text-sm font-semibold"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-amber-400">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="border border-red-400 text-red-400 px-3 py-1.5 rounded-full hover:bg-red-400 hover:text-white transition-all duration-300 text-xs"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setActiveModal("login")}
                className="border border-amber-400 text-amber-400 cursor-pointer px-4 py-2 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 text-sm"
              >
                Login
              </button>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="lg:hidden flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link 
                  to="/dashboard" 
                  className="bg-amber-400 text-black px-3 py-1.5 rounded-full hover:bg-amber-500 transition-all duration-300 text-xs font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="border border-red-400 text-red-400 px-2 py-1 rounded-full hover:bg-red-400 hover:text-white transition-all duration-300 text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveModal("login")}
                className="border border-amber-400 text-amber-400 cursor-pointer px-3 py-1.5 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 text-xs"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col gap-1 p-2 cursor-pointer"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-4 pt-4 pb-2">
            <Link 
              to="/" 
              className="hover:text-amber-400 transition-colors duration-300 px-2 py-2 border-b border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="hover:text-amber-400 transition-colors duration-300 px-2 py-2 border-b border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/academics" 
              className="hover:text-amber-400 transition-colors duration-300 px-2 py-2 border-b border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Academics
            </Link>
            <Link 
              to="/admissions" 
              className="hover:text-amber-400 transition-colors duration-300 px-2 py-2 border-b border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admissions
            </Link>
            <Link 
              to="/gallery" 
              className="hover:text-amber-400 transition-colors duration-300 px-2 py-2 border-b border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-amber-400 transition-colors duration-300 px-2 py-2 border-b border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {activeModal && <AuthModal activeModal={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  );
};
export default Header;