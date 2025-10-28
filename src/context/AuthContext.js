import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, fullName) => {
    if (!auth) {
      toast.error('Firebase not initialized. Please configure your .env file.');
      return;
    }

    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);

      if (fullName) {
        try {
          await updateProfile(credentials.user, { displayName: fullName });
        } catch (profileError) {
          console.error('Failed to set display name', profileError);
        }
      }

      toast.success('Account created successfully!');
    } catch (error) {
      const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'This email is already registered'
        : error.code === 'auth/weak-password'
        ? 'Password should be at least 6 characters'
        : error.message;
      toast.error(errorMessage);
      throw error;
    }
  };

  const logIn = async (email, password) => {
    if (!auth) {
      toast.error('Firebase not initialized. Please configure your .env file.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : error.code === 'auth/wrong-password'
        ? 'Incorrect password'
        : error.code === 'auth/invalid-email'
        ? 'Invalid email address'
        : error.message;
      toast.error(errorMessage);
      throw error;
    }
  };

  const logOut = async () => {
    if (!auth) {
      toast.error('Firebase not initialized.');
      return;
    }

    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    logIn,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
