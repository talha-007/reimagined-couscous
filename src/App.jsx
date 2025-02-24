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

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pixel-grid" element={<PixelGrid />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
