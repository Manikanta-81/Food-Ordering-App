import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Review } from '../../types';
import { reviews as reviewsData } from '../../data/reviews';
import AuthModal from './AuthModal';

interface ReviewSectionProps {
  foodId: string;
}

export default function ReviewSection({ foodId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { user, isAuthenticated } = useAuth();

  // Load reviews for this food item
  useEffect(() => {
    const foodReviews = reviewsData.filter(review => review.foodId === foodId);
    setReviews(foodReviews);
    
    // Calculate average rating
    if (foodReviews.length > 0) {
      const totalRating = foodReviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRating / foodReviews.length);
    }
  }, [foodId]);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (!userReview.trim()) {
      alert('Please enter a review');
      return;
    }
    
    // In a real app, this would be an API call
    const newReview: Review = {
      id: `rev_${Date.now()}`,
      userId: user?.id || 'guest',
      userName: user?.name || 'Guest',
      foodId,
      rating: userRating,
      comment: userReview,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update local state
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    // Recalculate average
    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating(totalRating / updatedReviews.length);
    
    // Reset form
    setUserReview('');
    setUserRating(0);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-darkText dark:text-dark-text mb-6">Reviews</h2>
      
      {/* Average Rating */}
      <div className="flex items-center mb-6">
        <div className="flex mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon 
              key={star} 
              className={`h-5 w-5 ${
                star <= Math.round(averageRating) 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="text-darkText dark:text-dark-text font-medium">
          {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
        </span>
      </div>
      
      {/* Write a Review */}
      <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-lg mb-8 animate-fade-in">
        <h3 className="text-lg font-medium text-darkText dark:text-dark-text mb-3">Write a Review</h3>
        
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-lightText dark:text-gray-400 mb-1">
              Your Rating
            </label>
            <div 
              className="flex" 
              onMouseLeave={handleRatingLeave}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  className="focus:outline-none"
                >
                  {(hoveredRating || userRating) >= star ? (
                    <StarIcon className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <StarIconOutline className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-lightText dark:text-gray-400 mb-1">
              Your Review
            </label>
            <textarea
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-primary dark:bg-dark-card dark:text-dark-text"
              rows={4}
              placeholder="Share your experience with this item..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Submit Review
          </button>
          
          {showSuccessMessage && (
            <div className="mt-3 p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded animate-fade-in">
              Review submitted successfully!
            </div>
          )}
        </form>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div 
              key={review.id} 
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 animate-fade-in"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <span className="font-medium text-darkText dark:text-dark-text">{review.userName}</span>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon 
                        key={star} 
                        className={`h-4 w-4 ${
                          star <= review.rating 
                            ? 'text-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-lightText dark:text-gray-400">{review.date}</span>
              </div>
              <p className="text-darkText dark:text-gray-300 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-lightText dark:text-gray-400 italic">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
} 