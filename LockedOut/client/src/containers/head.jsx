import React from 'react';

const Head = () => {
  return (
    <header className="bg-stone-900 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Escape Room</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#home" className="text-white hover:text-gray-400">Home</a></li>
            <li><a href="#about" className="text-white hover:text-gray-400">About</a></li>
            <li><a href="#contact" className="text-white hover:text-gray-400">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Head;