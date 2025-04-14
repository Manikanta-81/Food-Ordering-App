import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { foodItems, categories } from '../data/foods';
import FoodCard from '../components/ui/FoodCard';
import { FoodItem } from '../types';

export default function MenuPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryId || null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set active category from URL param if available
    if (categoryId) {
      setActiveCategory(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    let filtered = [...foodItems];
    
    // Filter by category if active
    if (activeCategory) {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Filter by search query if any
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredItems(filtered);
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
        
        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search our menu..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setSearchQuery('')}
            >
              {searchQuery && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Categories Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === null 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-darkText hover:bg-gray-300'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All Items
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-darkText hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-darkText mb-2">No items found</h3>
            <p className="text-lightText">Try changing your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 