import { logout, signInWithGoogle } from "../../firebaseconfig";

export const loginWithGoogle = async () => {
  const { user, error } = await signInWithGoogle();

  if (error) {
    console.error("Login Error:", error);
    return { success: false, error };
  }

  const userData = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  localStorage.setItem("user", JSON.stringify(userData));

  return { success: true, user: userData };
};

export const logoutUser = async () => {
  const { success, error } = await logout();
  if (!success) {
    console.error("Logout Error:", error);
    return { success: false, error };
  }

  localStorage.removeItem("user");
  return { success: true };
};
