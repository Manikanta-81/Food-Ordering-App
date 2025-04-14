import { FoodItem, Category } from "../types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Juicy burgers with various toppings"
  },
  {
    id: "2",
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Delicious pizzas with a variety of toppings"
  },
  {
    id: "3",
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Fresh pasta dishes with homemade sauces"
  },
  {
    id: "4",
    name: "Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Crisp and healthy salads"
  },
  {
    id: "5",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Sweet treats to satisfy your cravings"
  },
  {
    id: "6",
    name: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Refreshing beverages"
  }
];

export const foodItems: FoodItem[] = [
  // Burgers
  {
    id: "101",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "1",
    tags: ["beef", "cheese", "classic"],
    ingredients: ["Beef patty", "Cheddar cheese", "Lettuce", "Tomato", "Onion", "Special sauce", "Sesame bun"],
    nutritionalInfo: {
      calories: 650,
      protein: 35,
      carbs: 40,
      fat: 38
    },
    available: true,
    popular: true
  },
  {
    id: "102",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables and vegan mayo",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "1",
    tags: ["vegetarian", "vegan", "healthy"],
    ingredients: ["Plant-based patty", "Lettuce", "Tomato", "Onion", "Vegan mayo", "Whole grain bun"],
    nutritionalInfo: {
      calories: 450,
      protein: 15,
      carbs: 60,
      fat: 18
    },
    available: true
  },
  // Pizza
  {
    id: "201",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "2",
    tags: ["vegetarian", "classic", "cheese"],
    ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Fresh basil", "Olive oil"],
    nutritionalInfo: {
      calories: 850,
      protein: 30,
      carbs: 90,
      fat: 40
    },
    available: true,
    popular: true
  },
  {
    id: "202",
    name: "Pepperoni Pizza",
    description: "Traditional pizza topped with pepperoni slices",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "2",
    tags: ["meat", "spicy", "popular"],
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Pepperoni slices"],
    nutritionalInfo: {
      calories: 950,
      protein: 40,
      carbs: 85,
      fat: 48
    },
    available: true,
    popular: true
  },
  // Pasta
  {
    id: "301",
    name: "Spaghetti Carbonara",
    description: "Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "3",
    tags: ["creamy", "bacon", "classic"],
    ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Black pepper", "Salt"],
    nutritionalInfo: {
      calories: 700,
      protein: 25,
      carbs: 80,
      fat: 30
    },
    available: true
  },
  // Salads
  {
    id: "401",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "4",
    tags: ["healthy", "classic", "chicken"],
    ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan cheese", "Grilled chicken"],
    nutritionalInfo: {
      calories: 350,
      protein: 20,
      carbs: 15,
      fat: 25
    },
    available: true
  },
  // Desserts
  {
    id: "501",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1616169201999-0d80134e9170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "5",
    tags: ["chocolate", "warm", "sweet"],
    ingredients: ["Chocolate", "Butter", "Eggs", "Flour", "Sugar", "Vanilla ice cream"],
    nutritionalInfo: {
      calories: 550,
      protein: 8,
      carbs: 70,
      fat: 30
    },
    available: true,
    popular: true
  },
  // Drinks
  {
    id: "601",
    name: "Fresh Strawberry Smoothie",
    description: "Refreshing smoothie made with fresh strawberries, yogurt, and honey",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1638176067000-9a2d3bf8f019?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "6",
    tags: ["fruit", "refreshing", "healthy"],
    ingredients: ["Fresh strawberries", "Greek yogurt", "Honey", "Ice"],
    nutritionalInfo: {
      calories: 220,
      protein: 8,
      carbs: 45,
      fat: 2
    },
    available: true
  }
]; 