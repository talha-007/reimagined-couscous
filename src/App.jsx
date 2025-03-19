import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signin from "./components/pages/login";
import Signup from "./components/pages/signup";
import Home from "./components/pages/Home";
import PixelGrid from "./components/pages/pixelGrdi/pixelGrid";
import InfluencerProfile from "./components/pages/influencerProfile/profile";
import BuyGrid from "./components/pages/buy grid/buyGrid";
import UserProfile from "./components/pages/userprofile/profile";
import EditProfile from "./components/pages/userprofile/editProfile";
import Marketplace from "./components/pages/marketplace/marketplace";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(null);
  useEffect(() => {
    const Authenticated = !!localStorage.getItem("token"); // Ensure boolean value
    setisAuthenticated(Authenticated);
  }, []);

  console.log("isAuthenticated", isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Accessible only if NOT logged in) */}
        {!isAuthenticated && (
          <>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pixel-grid" element={<PixelGrid />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </>
        )}

        {/* Private Routes (Accessible only if logged in) */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pixel-grid" element={<PixelGrid />} />
            <Route path="/buy-grid" element={<BuyGrid />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/influencer-profile" element={<InfluencerProfile />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/sign-in"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
