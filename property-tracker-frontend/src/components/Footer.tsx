import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-gradient-to-r lg:fixed lg:bottom-0 lg:left-0 w-full from-purple-600 via-pink-600 to-red-600 p-6 text-white text-center'>
      <p className='text font-semibold'>
        &copy; 2024 PropertyTracker. All rights reserved.
      </p>
      <p className='text-sm'>
        Empowering secure and transparent property ownership with blockchain
        technology.
      </p>
    </footer>
  );
};

export default Footer;
