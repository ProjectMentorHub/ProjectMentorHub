import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { auth } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Sync cart with Firebase when user logs in
  useEffect(() => {
    const syncCartWithFirebase = async () => {
      if (!user || !auth) return;

      try {
        const userCartRef = doc(db, 'userCarts', user.uid);
        const userCartSnap = await getDoc(userCartRef);

        if (userCartSnap.exists()) {
          // User has a saved cart in Firebase
          const savedCart = userCartSnap.data().cart;
          if (savedCart && savedCart.length > 0) {
            setCart(savedCart);
            toast.success('Your cart has been restored');
          }
        }
      } catch (error) {
        console.error('Error syncing cart with Firebase:', error);
      }
    };

    syncCartWithFirebase();
  }, [user]);

  // Save cart to Firebase whenever it changes and user is logged in
  useEffect(() => {
    const saveCartToFirebase = async () => {
      if (!user || !auth || cart.length === 0) return;

      try {
        const userCartRef = doc(db, 'userCarts', user.uid);
        await setDoc(userCartRef, { cart }, { merge: true });
      } catch (error) {
        console.error('Error saving cart to Firebase:', error);
      }
    };

    // Debounce to avoid too many writes
    const timer = setTimeout(() => {
      saveCartToFirebase();
    }, 1000);

    return () => clearTimeout(timer);
  }, [cart, user]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    toast.success('Added to cart');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success('Removed from cart');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
