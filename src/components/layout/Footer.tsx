import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-darkText dark:bg-dark-bg text-white pt-12 pb-8 transition-colors duration-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="text-primary">Tasty</span>
              <span className="text-secondary">Bites</span>
            </Link>
            <p className="mt-4 text-gray-300 dark:text-gray-400">
              Delicious food delivered to your doorstep. We use only the freshest ingredients for a perfect meal every time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors">Menu</Link></li>
              <li><Link to="/about" className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>123 Food Street, Tasty City</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@tastybites.com</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>Monday - Friday: 8:00 AM - 10:00 PM</li>
              <li>Saturday - Sunday: 9:00 AM - 11:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TastyBites. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 dark:text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 