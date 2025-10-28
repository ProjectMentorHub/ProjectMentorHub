// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc9vXcqJLsg83E1VjzoEK-QzTxlrhaLyY",
  authDomain: "projectmentorhub-192a7.firebaseapp.com",
  projectId: "projectmentorhub-192a7",
  storageBucket: "projectmentorhub-192a7.firebasestorage.app",
  messagingSenderId: "267145784759",
  appId: "1:267145784759:web:a393a30f9332773eb98c32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Initialize services you will use
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// (optional) Analytics — only if you enabled Analytics in Firebase
export const analytics = getAnalytics(app);
