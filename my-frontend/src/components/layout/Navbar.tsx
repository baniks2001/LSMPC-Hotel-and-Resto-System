import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Hotel, UtensilsCrossed, Info, UserCog, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-gray-800 px-6 py-4 flex items-center justify-between shadow-2xl sticky top-0 z-50 rounded-b-2xl">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="LSMPC Logo" className="w-8 h-8" />
        <h1 className="text-xl font-semibold text-white tracking-wider drop-shadow-lg">LSMPC Hotel & Resto</h1>
      </div>

      {/* Desktop and large screens */}
      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6 items-center">
          {[ 
            { to: '/', icon: Home, label: 'Home' },
            { to: '/reserve', icon: Hotel, label: 'Reserve' },
            { to: '/order', icon: UtensilsCrossed, label: 'Order' },
            { to: '/about-us', icon: Info, label: 'About Us' }
          ].map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-1 text-white hover:text-green-200 transition-transform transform hover:scale-110 hover:translate-y-1 p-2 rounded-lg"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            </li>
          ))}
          <li className="border-l pl-6 ml-2">
            <Link
              to="/admin"
              className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              <UserCog className="w-5 h-5" />
              Admin
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white p-2"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 p-4 transition-transform ${isMenuOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
      >
        <ul className="flex flex-col gap-4 items-center">
          {[ 
            { to: '/', icon: Home, label: 'Home' },
            { to: '/reserve', icon: Hotel, label: 'Reserve' },
            { to: '/order', icon: UtensilsCrossed, label: 'Order' },
            { to: '/about-us', icon: Info, label: 'About Us' }
          ].map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex items-center gap-1 text-white hover:text-green-200 transition-transform transform hover:scale-110 hover:translate-y-1 p-2 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            </li>
          ))}
          <li className="border-t pt-4 mt-4 w-full">
            <Link
              to="/admin"
              className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCog className="w-5 h-5" />
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
