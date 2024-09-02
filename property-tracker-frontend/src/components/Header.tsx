import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-4 shadow-lg text-white fixed w-full top-0 z-50'>
      <nav className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link
          to='/'
          className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'
        >
          PropertyTracker
        </Link>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-2 rounded-md focus:outline-none transition-colors duration-300 `}
          onClick={toggleMenu}
          aria-label='Toggle navigation'
        >
          <span className='text-2xl'>{isOpen ? '✖️' : '☰'}</span>
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-4 ${
            isOpen
              ? 'block absolute top-16 right-0 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-4 rounded-md shadow-lg lg:static lg:w-auto lg:bg-transparent lg:p-0 text-center'
              : 'hidden'
          }`}
        >
          <Link
            to='/register'
            className='block lg:inline-block text-lg py-2 px-4 hover:text-indigo-200 transition-colors duration-300'
          >
            Register Property
          </Link>
          <Link
            to='/transfer'
            className='block lg:inline-block text-lg py-2 px-4 hover:text-indigo-200 transition-colors duration-300'
          >
            Transfer Ownership
          </Link>
          <Link
            to='/history'
            className='block lg:inline-block text-lg py-2 px-4 hover:text-indigo-200 transition-colors duration-300'
          >
            Property History
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
