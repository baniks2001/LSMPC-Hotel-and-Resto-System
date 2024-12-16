import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Building2,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleToggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-5 left-5 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:text-green-600 bg-green-100 rounded-lg shadow-md"
        >
          {isSidebarVisible ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {/* Sidebar for larger screens */}
      <div
        className={`bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-6 flex flex-col shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} md:block hidden`}
      >
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/logo.png"
            alt="LSMPC Logo"
            className={`w-10 h-10 rounded-full shadow-md transition-all duration-300 ${isOpen ? '' : 'hidden'}`}
          />
          <h1
            className={`text-2xl font-bold text-green-700 transition-all duration-300 ${isOpen ? '' : 'hidden'}`}
          >
            Admin Panel
          </h1>
          <button
            onClick={handleToggleCollapse}
            className="ml-auto p-2 text-gray-600 hover:text-green-600 md:hidden"
          >
            {isOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {[
              { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { to: '/admin/sales', icon: BarChart3, label: 'Sales Report' },
            ].map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-4 p-3 rounded-lg bg-white shadow-sm hover:bg-green-200 hover:shadow-lg transition-all duration-300 ease-in-out ${
                    !isOpen ? 'justify-center' : ''
                  }`}
                >
                  <Icon size={24} className="text-green-600" />
                  {isOpen && <span className="text-lg font-medium text-gray-700">{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-4 p-3 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 hover:shadow-lg rounded-lg transition-all duration-300 ease-in-out"
        >
          <LogOut size={24} />
          {isOpen && <span className="text-lg font-medium">Logout</span>}
        </button>
      </div>

      {/* Navbar for mobile */}
      <div
        className={`bg-gradient-to-b from-green-50 to-green-100 p-6 flex justify-between items-center shadow-lg md:hidden ${isSidebarVisible ? 'block' : 'hidden'}`}
      >
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="LSMPC Logo"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <h1 className="text-2xl font-bold text-green-700">Admin Panel</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:text-green-600"
        >
          {isSidebarVisible ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col space-y-3">
          {[
            { to: '/admin/dashboard', label: 'Dashboard' },
            { to: '/admin/sales', label: 'Sales Report' },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-4 p-3 rounded-lg bg-white shadow-sm hover:bg-green-200 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <span className="text-lg font-medium text-gray-700">{label}</span>
              </Link>
            </li>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-4 p-3 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 hover:shadow-lg rounded-lg transition-all duration-300 ease-in-out"
        >
          <LogOut size={24} />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
