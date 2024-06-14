import React, { useState } from 'react';

const hotels = [
  {
    name: 'Hotel Sunshine',
    description: 'Beautiful hotel with excellent amenities and friendly staff.',
    price: '$120/night',
    imageUrl: '/hotel1.jpeg'
  },
  {
    name: 'Ocean View Resort',
    description: 'Enjoy the breathtaking ocean views and luxurious accommodations.',
    price: '$180/night',
    imageUrl: '/hotel2.jpeg'
  },
  {
    name: 'Mountain Escape Lodge',
    description: 'Perfect retreat for those who love nature and tranquility.',
    price: '$150/night',
    imageUrl: '/hotel3.jpeg'
  }
];

export default function IndexPage() {
  const [search, setSearch] = useState('');

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.description.toLowerCase().includes(search.toLowerCase()) ||
    hotel.price.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <div className="flex w-full max-w-lg gap-2">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search for hotels..."
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-center mb-8">Home Page</h1>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHotels.map((hotel, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={hotel.imageUrl} alt="Hotel" className="w-full h-60 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <p className="text-gray-700 mb-4">{hotel.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">{hotel.price}</span>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}