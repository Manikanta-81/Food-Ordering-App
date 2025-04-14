import { useState } from 'react';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { FoodItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from './AuthModal';

interface FoodCardProps {
  food: FoodItem;
}

export default function FoodCard({ food }: FoodCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth();

  const isFoodFavorite = isFavorite(food.id);

  const handleAddToCart = () => {
    addToCart(food);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isFoodFavorite) {
      removeFromFavorites(food.id);
    } else {
      addToFavorites(food.id);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 dark:bg-dark-card">
      <div className="relative">
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-48 object-cover"
        />
        {food.popular && (
          <div className="absolute top-2 right-2 bg-accent text-darkText text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md transition-transform hover:scale-110"
          aria-label={isFoodFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFoodFavorite ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      
      <div className="p-4 dark:text-dark-text">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-darkText dark:text-dark-text">{food.name}</h3>
          <span className="text-primary font-bold">${food.price.toFixed(2)}</span>
        </div>
        
        <p className="text-lightText dark:text-gray-400 text-sm mt-2 line-clamp-2">{food.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <Link 
            to={`/food/${food.id}`} 
            className="text-secondary font-medium text-sm hover:underline"
          >
            View Details
          </Link>
          
          <button 
            className={`flex items-center justify-center p-2 rounded-full transition-colors
              ${isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-primary text-white hover:bg-opacity-90'
              }`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
} 