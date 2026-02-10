import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-primary font-bold text-xl">CampusMarket</span>
            <p className="text-gray-500 text-sm mt-1">Buy and sell within your campus</p>
          </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xl text-gray-600">
                <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <FaFacebookF />
                </Link>
                <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <FaTwitter />
                </Link>
                <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  <FaInstagram />
                </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CampusMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
