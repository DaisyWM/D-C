import React from 'react';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';

export default function AboutPage() {
  return (
    <>
      <HomeHeader />
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl font-bold text-primary">About D&C Travel Agency</h1>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            At D&C Travel Agency, we believe that travel is not just about reaching a destination; it’s about experiencing the journey. We are dedicated to providing our customers with unforgettable travel experiences, whether they are exploring exotic destinations, relaxing in luxurious hotels, or flying with world-class airlines.
          </p>
        </div>

        <div className="container mx-auto px-6 md:px-12 mt-12">
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full md:w-6/12 p-4">
              <img src="/journey.jpeg" alt="Journey" className="rounded-lg shadow-lg" />
            </div>
            <div className="w-full md:w-6/12 p-4">
              <h2 className="text-3xl font-bold text-primary">Our Journey</h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Founded in 2000, D&C Travel Agency has grown from a small local business into a global travel solutions provider. Our commitment to excellence and passion for travel has driven us to offer the best services in the industry. From personalized travel planning to exclusive deals, we strive to meet and exceed the expectations of our clients.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 mt-12">
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full md:w-6/12 p-4 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                Our mission is to make travel accessible, enjoyable, and memorable for everyone. We work tirelessly to curate the best travel experiences, offering tailored solutions that cater to the unique needs and preferences of each traveler. We believe in the transformative power of travel and aim to inspire our customers to explore the world.
              </p>
            </div>
            <div className="w-full md:w-6/12 p-4 order-1 md:order-2">
              <img src="/mission.jpeg" alt="Mission" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 mt-12">
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full md:w-6/12 p-4">
              <img src="/customer.webp" alt="Values" className="rounded-lg shadow-lg" />
            </div>
            <div className="w-full md:w-6/12 p-4">
              <h2 className="text-3xl font-bold text-primary">Our Values</h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                At the core of our business are values that guide us in everything we do. Integrity, customer satisfaction, innovation, and sustainability are the pillars of our company. We are committed to ethical practices, continuous improvement, and making a positive impact on the communities we serve and the environment.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Meet Our Team</h2>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              Our dedicated team of travel experts is here to assist you with every aspect of your journey. With years of experience and a deep passion for travel, we ensure that your experience with D&C Travel Agency is seamless and enjoyable from start to finish.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="/team8.jpeg" alt="Team Member 1" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary">John Doe</h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="/team6.jpeg" alt="Team Member 3" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary">Michael Brown</h3>
                  <p className="text-gray-600">Head of Marketing</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="/team7.jpeg" alt="Team Member 4" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary">Emily Davis</h3>
                  <p className="text-gray-600">Travel Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
}
