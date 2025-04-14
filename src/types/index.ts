export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  available: boolean;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  favorites?: string[]; // Array of food item IDs
  orderHistory?: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  foodId: string;
  rating: number;
  comment: string;
  date: string;
} 