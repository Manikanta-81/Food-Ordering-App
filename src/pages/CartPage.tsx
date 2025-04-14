import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItemComponent from '../components/ui/CartItem';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Order } from '../types';

export default function CartPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, updateUserProfile } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new order
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      items: [...items],
      total: getTotalPrice() + 2.99 + (getTotalPrice() * 0.08), // Subtotal + delivery + tax
      date: new Date().toISOString(),
      status: 'pending',
      deliveryAddress: formData.address,
      paymentMethod: formData.paymentMethod
    };
    
    setOrderId(newOrder.id);
    
    // If user is logged in, update their profile with the order
    if (user) {
      // Update user profile with new order and potentially new address/phone
      const updatedOrderHistory = [...(user.orderHistory || []), newOrder];
      updateUserProfile({
        orderHistory: updatedOrderHistory,
        address: formData.address,
        phone: formData.phone
      });
    }
    
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      setOrderPlaced(true);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-darkText mb-4">Order Placed!</h2>
          <p className="text-lightText mb-2">
            Your order <span className="font-semibold">#{orderId.substring(0, 8)}</span> has been placed successfully.
          </p>
          <p className="text-lightText mb-6">
            You'll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col space-y-3">
            <Link to="/orders" className="btn btn-primary">
              View Order Status
            </Link>
            <Link to="/" className="btn bg-gray-200 text-darkText hover:bg-gray-300">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-darkText mb-4">Your cart is empty</h2>
          <p className="text-lightText mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/menu" className="btn btn-primary block">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Link to="/menu" className="text-secondary hover:text-primary flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {items.map(item => (
                <CartItemComponent key={item.item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-lightText">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-lightText">Delivery Fee</span>
                <span>$2.99</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-lightText">Tax</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between py-4 font-bold">
                <span>Total</span>
                <span>${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-full mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        {isCheckingOut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Checkout</h2>
                <button 
                  onClick={() => setIsCheckingOut(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handlePlaceOrder}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-darkText mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-darkText mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-darkText mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-darkText mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-darkText mb-1">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="card">Credit Card</option>
                    <option value="cash">Cash on Delivery</option>
                  </select>
                </div>
                
                <div className="flex justify-between font-bold mb-4">
                  <span>Total Amount:</span>
                  <span>${(getTotalPrice() + 2.99 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 