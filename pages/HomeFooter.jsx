import React from 'react';

export default function HomeFooter() {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 D&C Travel Agency. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/" className="text-gray-400">Home</a>
          <a href="/about" className="text-gray-400">About</a>
          <a href="/destinations" className="text-gray-400">Destinations</a>
        </div>
      </div>
    </footer>
  );
}
