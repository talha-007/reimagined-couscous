import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signin from "./components/pages/login";
import Home from "./components/pages/Home";
import Signup from "./components/pages/signup";
import PixelGrid from "./components/pages/pixelGrdi/pixelGrid";
import InfluencerProfile from "./components/pages/influencerProfile/profile";
import BuyGrid from "./components/pages/buy grid/buyGrid";
import UserProfile from "./components/pages/userprofile/profile";
import EditProfile from "./components/pages/userprofile/editProfile";
import Marketplace from "./components/pages/marketplace/marketplace";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pixel-grid" element={<PixelGrid />} />
            <Route path="/buy-grid" element={<BuyGrid />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/influencer-profile" element={<InfluencerProfile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
