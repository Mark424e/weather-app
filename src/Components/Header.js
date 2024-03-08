import React from 'react';

const Header = () => {
  return (
    <header className="bg-backgroundColor text-textColor p-4 border-b">
      <div className='container mx-auto'>
        <div>
          <h1 className="text-2xl font-bold">Weather App</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
