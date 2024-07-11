import React from 'react';
import HomeHeader from './HomeHeader';
import HomePopularDestinations from './HomePopularDestinations';
import HomeFooter from './HomeFooter';

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <div>
        <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/homepage.jpeg')" }}>
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
            <h1 className="text-5xl font-bold">Discover Your Next Adventure</h1>
            <p className="mt-4 text-xl">Book the best hotels and airlines around the world.</p>
          </div>
        </section>

        <section id="features" className="py-12 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary">Our Features</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              <div className="max-w-sm bg-white shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300">
                <img src="/booking.jpeg" alt="Easy Booking" className="w-full h-43 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-primary">Easy Booking</h3>
                <p className="mt-4 text-gray-600">Book your favorite hotels and airlines with ease.</p>
              </div>
              <div className="max-w-sm bg-white shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300">
                <img src="/prices.webp" alt="Best Prices" className="w-full h-43 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-primary">Best Prices</h3>
                <p className="mt-4 text-gray-600">We offer competitive prices for all destinations.</p>
              </div>
              <div className="max-w-sm bg-white shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300">
                <img src="/customer3.webp" alt="24/7 Support" className="w-full h-43 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-primary">24/7 Support</h3>
                <p className="mt-4 text-gray-600">Our support team is available anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <HomePopularDestinations />
      <HomeFooter />
    </>
  );
}
