import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signin from "./components/pages/login";
import Signup from "./components/pages/signup";
import Home from "./components/pages/Home";
import PixelGrid from "./components/pages/pixelGrdi/pixelGrid";
import InfluencerProfile from "./components/pages/influencerProfile/profile";
import BuyGrid from "./components/pages/buy grid/buyGrid";
import UserProfile from "./components/pages/userprofile/profile";
import EditProfile from "./components/pages/userprofile/editProfile";
import Marketplace from "./components/pages/marketplace/marketplace";
import { useEffect } from "react";
import { logout } from "./redux/slice/authSlice";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pixel-grid" element={<PixelGrid />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </>
        ) : (
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
