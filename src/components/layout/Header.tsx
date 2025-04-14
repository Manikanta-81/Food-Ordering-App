import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon, UserIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../ui/AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-dark-card shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
          <span className="text-primary">Tasty</span>
          <span className="text-secondary">Bites</span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <Link to="/menu" className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors">
            Menu
          </Link>
          <Link to="/about" className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button 
            onClick={toggleTheme} 
            className="text-darkText dark:text-dark-text hover:text-primary transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-darkText dark:text-dark-text hover:text-primary transition-colors" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-once">
                {getTotalItems()}
              </span>
            )}
          </Link>
          
          {/* User Authentication */}
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 text-darkText dark:text-dark-text hover:text-primary transition-colors"
              >
                <span className="hidden md:block">
                  {user?.name.split(' ')[0]}
                </span>
                <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 z-50 animate-slide-down">
                  <div className="px-4 py-2 text-sm text-darkText dark:text-dark-text font-medium border-b border-gray-200 dark:border-gray-700">
                    Signed in as<br />
                    <span className="font-semibold">{user?.email}</span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-darkText dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-darkText dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Orders
                  </Link>
                  <Link 
                    to="/favorites" 
                    className="block px-4 py-2 text-sm text-darkText dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={openAuthModal}
              className="flex items-center space-x-1 text-darkText dark:text-dark-text hover:text-primary transition-colors"
            >
              <UserIcon className="h-6 w-6" />
              <span className="hidden md:block">Sign In</span>
            </button>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-darkText dark:text-dark-text" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-darkText dark:text-dark-text" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-card py-2 px-4 shadow-lg animate-slide-down">
          <nav className="flex flex-col space-y-4 py-2">
            <Link 
              to="/" 
              className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-darkText dark:text-dark-text hover:text-primary font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
} 