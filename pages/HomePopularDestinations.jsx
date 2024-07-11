import React from 'react';

export default function HomePopularDestinations() {
  return (
    <section id="destinations" className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Popular Destinations</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md p-5 rounded-lg">
            <img src="/destination1.jpeg" alt="Majestic Steps" className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Majestic Steps</h3>
            <p className="mt-2 text-gray-600">Grand hotel entrance with stunning views.</p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-lg">
            <img src="/destination2.webp" alt="Skyline Serenity" className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Skyline Serenity</h3>
            <p className="mt-2 text-gray-600">Gorgeous plane soaring through serene skies.</p>
          </div>
          <div className="bg-white shadow-md p-5 rounded-lg">
            <img src="/destination3.jpeg" alt="Elegant Retreat" className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4">Elegant Retreat</h3>
            <p className="mt-2 text-gray-600">Luxurious hotel offering tranquility and elegance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
