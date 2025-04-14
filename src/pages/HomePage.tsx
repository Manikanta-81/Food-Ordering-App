import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { foodItems, categories } from '../data/foods';
import FoodCard from '../components/ui/FoodCard';
import CategoryCard from '../components/ui/CategoryCard';
import { FoodItem } from '../types';

export default function HomePage() {
  const [popularItems, setPopularItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    // Get popular items from the food data
    const popular = foodItems.filter(item => item.popular);
    setPopularItems(popular);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-darkText text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
            alt="Food hero" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container relative py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Delicious Food Delivered to Your Door</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover a wide variety of tasty meals prepared by our expert chefs using the freshest ingredients
          </p>
          <div className="flex space-x-4">
            <Link to="/menu" className="btn btn-primary">
              Browse Menu
            </Link>
            <Link to="/about" className="btn bg-white text-darkText hover:bg-gray-100">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Food Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Items</h2>
          <p className="text-lightText text-center mb-12 max-w-2xl mx-auto">
            Our customers' most loved dishes that are worth trying
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularItems.map(item => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu" className="btn btn-primary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-secondary bg-opacity-10">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-lightText">Your food delivered to your door in minutes, hot and fresh.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Food</h3>
              <p className="text-lightText">Only the freshest ingredients and expert chefs to prepare your meals.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Payment</h3>
              <p className="text-lightText">Multiple payment options for a seamless checkout experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 