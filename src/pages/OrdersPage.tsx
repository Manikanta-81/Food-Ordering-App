import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user && user.orderHistory) {
      // Sort orders by date (newest first)
      const sortedOrders = [...user.orderHistory].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setOrders(sortedOrders);
    }
  }, [user]);

  // Redirect message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-darkText mb-4">Please sign in</h2>
          <p className="text-lightText mb-6">
            You need to be logged in to view your order history.
          </p>
          <Link to="/" className="btn btn-primary block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-darkText mb-4">No orders yet</h2>
          <p className="text-lightText mb-6">
            You haven't placed any orders yet. Start shopping to place your first order!
          </p>
          <Link to="/menu" className="btn btn-primary block">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to get status badge color
  const getStatusBadgeColor = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <Link to="/" className="text-secondary hover:text-primary flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold">Order #{order.id.substring(0, 8)}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-lightText mt-1">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-lightText">Total Amount</p>
                  <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6">
                <h4 className="font-medium mb-3">Order Items</h4>
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={item.item.image} 
                            alt={item.item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link to={`/food/${item.item.id}`} className="font-medium hover:text-primary">
                            {item.item.name}
                          </Link>
                          <p className="text-sm text-lightText">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-lightText">${item.item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Delivery Address</h4>
                    <p className="text-sm text-lightText">{order.deliveryAddress}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <p className="text-sm text-lightText">{order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}</p>
                  </div>
                </div>
                {order.status === 'pending' && (
                  <div className="mt-4 flex justify-end">
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 