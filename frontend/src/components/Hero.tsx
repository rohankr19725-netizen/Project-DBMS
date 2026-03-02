
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-gradient overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-5 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-semibold">
              🎓 Campus Marketplace
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Smart Campus
              <span className="text-pink-600"> Marketplace</span>
              <span className="inline-block ml-2 animate-bounce">🎓</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Buy and sell with fellow students. No shipping, no waiting - just quick campus transactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/home">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-2 hover:border-pink-600 hover:text-pink-600 transition-all">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block animate-slide-up">
            <div className="relative animate-float">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-40 animate-pulse-slow"></div>
              <img 
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&q=80&w=2047"
                alt="Students at campus" 
                className="relative w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
