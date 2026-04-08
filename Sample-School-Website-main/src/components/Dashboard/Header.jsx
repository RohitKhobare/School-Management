import React from 'react';
import { FaBell, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle, badgeText, onMenuClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-3 sm:p-6">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300 shrink-0"
          >
            <FaBars className="w-5 h-5" />
          </button>
          
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{title}</h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate hidden sm:block">{subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-300 hidden sm:block">
            <FaBell className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button 
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
            title="Logout"
          >
            <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs sm:text-sm">{badgeText}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
