import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, ArrowLeftIcon, CheckIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { foodItems, categories } from '../data/foods';
import { FoodItem } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/ui/ReviewSection';
import AuthModal from '../components/ui/AuthModal';

export default function FoodDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { addToCart } = useCart();
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundFood = foodItems.find(item => item.id === id);
      setFood(foundFood || null);
    }
  }, [id]);

  if (!food) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-dark-text">Food item not found</h2>
        <Link to="/menu" className="text-secondary hover:underline">
          Return to menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (isFavorite(food.id)) {
      removeFromFavorites(food.id);
    } else {
      addToFavorites(food.id);
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center text-secondary hover:text-primary"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Food Image */}
            <div className="h-64 md:h-full relative">
              <img 
                src={food.image} 
                alt={food.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md transition-transform hover:scale-110"
                aria-label={isFavorite(food.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(food.id) ? (
                  <HeartIconSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>

            {/* Food Details */}
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl md:text-3xl font-bold text-darkText dark:text-dark-text">{food.name}</h1>
                <span className="text-2xl font-bold text-primary">${food.price.toFixed(2)}</span>
              </div>

              <div className="mt-4">
                <span className="bg-secondary bg-opacity-10 text-secondary text-sm px-3 py-1 rounded-full">
                  {categories.find(c => c.id === food.category)?.name || 'Uncategorized'}
                </span>
                {food.popular && (
                  <span className="ml-2 bg-accent bg-opacity-10 text-darkText dark:text-dark-text text-sm px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <p className="mt-6 text-lightText dark:text-gray-400">{food.description}</p>

              {/* Tags */}
              {food.tags && food.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-darkText dark:text-dark-text mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {food.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-gray-200 dark:bg-gray-700 text-lightText dark:text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {food.ingredients && food.ingredients.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-darkText dark:text-dark-text mb-2">Ingredients:</h3>
                  <ul className="list-disc pl-5 text-lightText dark:text-gray-400 text-sm">
                    {food.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition Info */}
              {food.nutritionalInfo && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-darkText dark:text-dark-text mb-2">Nutritional Information:</h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <span className="block text-xs text-lightText dark:text-gray-400">Calories</span>
                      <span className="font-bold dark:text-dark-text">{food.nutritionalInfo.calories}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <span className="block text-xs text-lightText dark:text-gray-400">Protein</span>
                      <span className="font-bold dark:text-dark-text">{food.nutritionalInfo.protein}g</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <span className="block text-xs text-lightText dark:text-gray-400">Carbs</span>
                      <span className="font-bold dark:text-dark-text">{food.nutritionalInfo.carbs}g</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <span className="block text-xs text-lightText dark:text-gray-400">Fat</span>
                      <span className="font-bold dark:text-dark-text">{food.nutritionalInfo.fat}g</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="mt-8 flex items-center">
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md mr-4">
                  <button
                    className="px-3 py-1 text-primary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 dark:text-dark-text">{quantity}</span>
                  <button
                    className="px-3 py-1 text-primary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className={`flex items-center justify-center btn ${
                    addedToCart ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'
                  } transition-colors duration-200`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>
                      <CheckIcon className="h-5 w-5 mr-1" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="h-5 w-5 mr-1" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Reviews */}
          <div className="px-6 md:px-8 pb-8">
            <ReviewSection foodId={food.id} />
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
} 