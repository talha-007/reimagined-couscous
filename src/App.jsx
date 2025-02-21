import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/pages/login";
import Home from "./components/pages/Home";
import Signup from "./components/pages/signup";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
