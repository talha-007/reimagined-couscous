import Footer from "../footer";
import Navbar from "../navbar";

const Layout = ({ children }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
