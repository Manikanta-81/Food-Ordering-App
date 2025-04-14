import React from 'react';

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About TastyBites</h1>
          <p className="text-lg text-lightText max-w-3xl mx-auto">
            Bringing delicious, fresh food to your doorstep since 2015
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lightText mb-4">
              TastyBites was founded with a simple but powerful idea: everyone deserves access to delicious, 
              high-quality food delivered right to their door. What started as a small operation serving just 
              one neighborhood has grown into the service trusted by thousands across the city.
            </p>
            <p className="text-lightText mb-4">
              Our founder, James Chen, began TastyBites after realizing how difficult it was to get quality 
              food delivered quickly without sacrificing quality. He assembled a team of culinary experts and
              tech innovators to create a seamless experience from order to delivery.
            </p>
            <p className="text-lightText">
              Today, we partner with over 200 restaurants to bring you a diverse selection of cuisines, 
              all prepared with the highest standards and delivered with care.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=3000" 
              alt="Our Story" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-lightText">We never compromise on the quality of food or service we provide. Your satisfaction is our top priority.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Focus</h3>
              <p className="text-lightText">We're committed to supporting local businesses and giving back to the communities we serve.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-lightText">We prioritize eco-friendly packaging and sustainable practices across all aspects of our business.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=1470" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">James Chen</h3>
                <p className="text-secondary mb-4">Founder & CEO</p>
                <p className="text-lightText">A visionary entrepreneur with over 15 years in the food and tech industries.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1476" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-secondary mb-4">Chief Operations Officer</p>
                <p className="text-lightText">Logistics expert who ensures your food arrives hot and on time, every time.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1374" 
                alt="Team Member" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Michael Rodriguez</h3>
                <p className="text-secondary mb-4">Chief Technology Officer</p>
                <p className="text-lightText">Tech innovator who built our platform from the ground up.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience TastyBites?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Order now and discover why thousands of customers trust us for their food delivery needs.
          </p>
          <a href="/menu" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3">
            Browse Our Menu
          </a>
        </div>
      </div>
    </div>
  );
} 