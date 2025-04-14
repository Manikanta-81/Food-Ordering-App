import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, FoodItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tastyBites_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with localStorage data if available
  const getInitialCartItems = (): CartItem[] => {
    try {
      if (typeof window === 'undefined') return [];
      
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  };

  const [items, setItems] = useState<CartItem[]>(getInitialCartItems);

  // Update localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }, [items]);

  const addToCart = (item: FoodItem) => {
    try {
      setItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.item.id === item.id);
        
        if (existingItem) {
          return prevItems.map(cartItem => 
            cartItem.item.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          );
        }
        
        return [...prevItems, { item, quantity: 1 }];
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = (itemId: string) => {
    try {
      setItems(prevItems => prevItems.filter(item => item.item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      
      setItems(prevItems => 
        prevItems.map(item => 
          item.item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const clearCart = () => {
    try {
      setItems([]);
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotalItems = () => {
    try {
      return items.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error('Error calculating total items:', error);
      return 0;
    }
  };

  const getTotalPrice = () => {
    try {
      return items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
    } catch (error) {
      console.error('Error calculating total price:', error);
      return 0;
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 