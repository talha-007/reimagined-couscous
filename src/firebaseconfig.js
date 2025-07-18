import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADvxP01G6rQn7VvMjvl_n_8Hp0Ro8CfLw",
  authDomain: "milliondollarinfluencer-c96ee.firebaseapp.com",
  projectId: "milliondollarinfluencer-c96ee",
  storageBucket: "milliondollarinfluencer-c96ee.firebasestorage.app",
  messagingSenderId: "363354177930",
  appId: "1:363354177930:web:2252ac1c0dc7bef418c873",
  measurementId: "G-K6WCQK5Y2J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle Google Login
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

// Function to handle Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

export { auth };
