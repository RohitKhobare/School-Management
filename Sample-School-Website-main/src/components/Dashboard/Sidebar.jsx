import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ items, activeTab, setActiveTab, role, onClose }) => {

  const getRoleInfo = () => {
    switch (role) {
      case 'admin':
        return { title: 'Admin Panel', subtitle: 'M.M. Vidya Mandir', badge: 'MM' };
      case 'teacher':
        return { title: 'Teacher Panel', subtitle: 'Mrs. Priya Sharma', badge: 'MM' };
      case 'student':
        return { title: 'Student Portal', subtitle: 'Arjun Patel', badge: 'AP' };
      default:
        return { title: 'Dashboard', subtitle: 'User', badge: 'U' };
    }
  };

  const roleInfo = getRoleInfo();

  const handleTabClick = (itemId) => {
    setActiveTab(itemId);
    if (onClose) onClose();
  };


  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <FaTimes className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm lg:text-base">{roleInfo.badge}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-gray-800 text-sm lg:text-base truncate">{roleInfo.title}</h2>
            <p className="text-xs lg:text-sm text-gray-600 truncate">{roleInfo.subtitle}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <ul className="space-y-1 lg:space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                  activeTab === item.id
                    ? 'bg-linear-to-r from-amber-400 to-amber-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />}
                <span className="truncate">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
};

export default Sidebar;