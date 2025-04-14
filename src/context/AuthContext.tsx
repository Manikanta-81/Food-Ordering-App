import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToFavorites: (foodId: string) => void;
  removeFromFavorites: (foodId: string) => void;
  isFavorite: (foodId: string) => boolean;
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'tastyBites_user';
const USERS_STORAGE_KEY = 'tastyBites_users';

// For demo purposes, we'll simulate a user database in localStorage
interface StoredUser extends User {
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      // Clear potentially corrupted data
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  // Helper to get all users from storage
  const getUsers = (): StoredUser[] => {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users from storage:', error);
      return [];
    }
  };

  // Helper to save users to storage
  const saveUsers = (users: StoredUser[]) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to storage:', error);
    }
  };

  // Login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Demo login - in a real app this would be an API call
      const users = getUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Create a copy without the password to store in state and localStorage
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Register functionality
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Demo registration - in a real app this would be an API call
      const users = getUsers();
      
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        return false;
      }
      
      // Create new user
      const newUser: StoredUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password,
        favorites: [],
        orderHistory: []
      };
      
      // Add to "database"
      saveUsers([...users, newUser]);
      
      // Log in with the new user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Add to favorites
  const addToFavorites = (foodId: string) => {
    if (!user) return;
    
    try {
      const updatedFavorites = [...(user.favorites || []), foodId];
      const updatedUser = { ...user, favorites: updatedFavorites };
      
      // Update state and localStorage
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Update in "database"
      const users = getUsers();
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, favorites: updatedFavorites } : u
      );
      saveUsers(updatedUsers);
    } catch (error) {
      console.error('Add to favorites error:', error);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (foodId: string) => {
    if (!user) return;
    
    try {
      const updatedFavorites = (user.favorites || []).filter(id => id !== foodId);
      const updatedUser = { ...user, favorites: updatedFavorites };
      
      // Update state and localStorage
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Update in "database"
      const users = getUsers();
      const updatedUsers = users.map(u => 
        u.id === user.id ? { ...u, favorites: updatedFavorites } : u
      );
      saveUsers(updatedUsers);
    } catch (error) {
      console.error('Remove from favorites error:', error);
    }
  };

  // Check if a food is in favorites
  const isFavorite = (foodId: string): boolean => {
    if (!user || !user.favorites) return false;
    return user.favorites.includes(foodId);
  };

  // Update user profile
  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...userData };
      
      // Update state and localStorage
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Update in "database" (without changing password)
      const users = getUsers();
      const userInDb = users.find(u => u.id === user.id);
      
      if (userInDb) {
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, ...userData, password: userInDb.password } : u
        );
        saveUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 