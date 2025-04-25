import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZGUW77hwIW1xY0zCwUWlYgMhInYdmrAE",
  authDomain: "million-dollar-influencer.firebaseapp.com",
  projectId: "million-dollar-influencer",
  storageBucket: "million-dollar-influencer.firebasestorage.app",
  messagingSenderId: "253383941540",
  appId: "1:253383941540:web:df49980079845f14a07531",
  measurementId: "G-D6F1C35JS5",
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
