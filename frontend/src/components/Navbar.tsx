import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; // important for session cookies

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login
  const navigate = useNavigate();
  // Check if the user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/check-auth");
        setIsLoggedIn(res.data.isAuthenticated);
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout"); // backend logout route
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-pink-600 font-bold text-2xl">CampusMarket</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
              Browse
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/post" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
                  Sell
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Button variant="outline" className="rounded-full" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="rounded-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-pink-600 hover:bg-pink-700 rounded-full shadow-md hover:shadow-lg transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Listings
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/post"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post Item
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button variant="outline" className="w-full mt-3" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  Log Out
                </Button>
              </>
            ) : (
              <div className="px-3 py-3 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
