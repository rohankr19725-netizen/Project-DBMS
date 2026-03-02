
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import { Card } from "@/components/ui/card";
import { Book, Upload, ShoppingCart, TrendingUp, Zap, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* How It Works */}
        <section className="py-16 bg-white/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Simple, fast, and convenient campus marketplace
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-pink-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">List Your Item</h3>
                <p className="text-sm text-gray-600">
                  Upload photos and set your price in seconds
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-yellow-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-10 w-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Connect Instantly</h3>
                <p className="text-sm text-gray-600">
                  Students reach out to buy your items
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Book className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Meet on Campus</h3>
                <p className="text-sm text-gray-600">
                  Safe, quick exchanges right on campus
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Categories */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-3 text-gray-600">
                Find exactly what you need 🔍
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Textbooks", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1740", emoji: "📚" },
                { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1740", emoji: "💻" },
                { name: "Furniture", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1470", emoji: "🛋️" },
                { name: "Clothing", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1470", emoji: "👕" }
              ].map((category, index) => (
                <Card key={index} className="overflow-hidden group relative h-48 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white hover:scale-105">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-5">
                    <span className="text-3xl mb-2 group-hover:scale-125 transition-transform">{category.emoji}</span>
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="py-16 bg-white/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
              <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                Safe, fast, and trusted by students
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Campus Verified</h3>
                <p className="text-sm text-gray-600">
                  All users are verified students from your campus
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Quick Exchange</h3>
                <p className="text-sm text-gray-600">
                  Meet in person on campus, no shipping needed
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Easy Communication</h3>
                <p className="text-sm text-gray-600">
                  Connect with buyers and sellers instantly
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Index;
