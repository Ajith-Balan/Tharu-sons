import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import usestates from '../../hooks/useStates';
import { useCart } from '../../context/cart';
import logo from '../../assets/Black White Elegant Monogram Initial Name Logo_20240606_180138_0000.png';
import SearchInput from '../search/Search';
import { BsCart4 } from "react-icons/bs";
import { FaInstagram, FaWhatsapp } from "react-icons/fa"; // Import Instagram and WhatsApp icons

const Header = () => {
  const States = usestates();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpend, setIsOpend] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsOpend(!isOpend);
  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logout successfully');
    setTimeout(() => navigate('/'), 1000);
  };

  const dashboardPath = `/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`;

  return (
    <nav className=" w-full fixed z-10  top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-black text-lg font-bold">
              <img className="h-8 w-auto rounded" src={logo} alt="Logo" />
            </Link>
          </div>

          <SearchInput />
    
          {/* Hamburger Icon for mobile */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-black-400 hover:text-black-800">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Links for large screens */}
          <div className="hidden sm:flex space-x-4 items-center">
            <Link to="/" className="text-black-300 hover:bg-gray-400 hover:text-black-800 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>

            <Link to="/about" className="text-black-300 hover:bg-gray-400 hover:text-black-800 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>

            {!auth.user ? (
              <>
                <Link to="/register" className="text-black-300 hover:bg-gray-400 hover:text-black-800 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
                <Link to="/login" className="text-black-300 hover:bg-gray-400 hover:text-black-800 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
              </>
            ) : (
              <div className="relative inline-block text-left">
                <button onClick={toggleDropdown} className="inline-flex justify-center w-full rounded-md px-4 py-2  text-sm font-medium text-black-800 x hover:bg-gray-400">
                  {auth?.user?.name}
                  <svg className="h-5 w-6 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
                  </svg>
                </button>
                {isOpend && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                  
                      <div onClick={handleLogout} className="block px-4 py-2 text-sm text-black-700 hover:bg-gray-100 cursor-pointer">
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* Social Icons */}
            {/* <div className="flex gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black-800 hover:text-gray-400">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="text-black-800 hover:text-gray-400">
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block text-gray-300 hover:bg-red-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>

          <Link to="/about" className="block text-gray-300 hover:bg-red-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            About Us
          </Link>
         
          {!auth.user ? (
            <>
              <Link to="/register" className="block text-gray-300 hover:bg-red-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
              <Link to="/login" className="block text-gray-300 hover:bg-red-400 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            </>
          ) : (
            <>
             
              <div onClick={handleLogout} className="block text-gray-300 hover:bg-red-400 hover:text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                Logout
              </div>
            </>
          )}

         
          <div className="flex gap-4">
              <a href="https://www.instagram.com/cj_attire?igsh=NmlnNDNiZXE0N2Nx&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://wa.me/qr/VIQQXSHMF7K4O1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                <FaWhatsapp className="h-6 w-6" />
              </a>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
