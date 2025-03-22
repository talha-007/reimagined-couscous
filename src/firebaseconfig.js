import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHnhwYqaBjh2pd74dGVyPJN_k6ES1n9yE",
  authDomain: "million-7911d.firebaseapp.com",
  projectId: "million-7911d",
  storageBucket: "million-7911d.appspot.com",
  messagingSenderId: "444228963827",
  appId: "1:444228963827:web:eba32e7e4007b534065686",
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
