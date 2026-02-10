
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-muted to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Buy and Sell Within Your Campus
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              The easiest way to buy, sell, and exchange items with fellow students. No shipping, no waiting - just campus transactions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-medium text-primary">Post Items</h3>
                <p className="text-sm text-gray-600 mt-1">List your unused items for sale</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-medium text-primary">Browse Listings</h3>
                <p className="text-sm text-gray-600 mt-1">Find deals from other students</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-medium text-primary">Safe Transactions</h3>
                <p className="text-sm text-gray-600 mt-1">Meet on campus for exchanges</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&q=80&w=2047"
              alt="Students at campus" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
