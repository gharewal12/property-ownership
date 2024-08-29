import React from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className='bg-blue-500 p-4 text-white'>
      <nav className='container mx-auto flex justify-between'>
        <Link
          to='/'
          className='font-bold'
        >
          Property Tracker
        </Link>
        <div>
          <Link
            to='/register'
            className='mr-4'
          >
            Register Property
          </Link>
          <Link
            to='/transfer'
            className='mr-4'
          >
            Transfer Ownership
          </Link>
          <Link to='/history'>Property History</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
