
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Book, Upload, ShoppingCart } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                CampusMarket makes buying and selling items within your campus simple, safe, and convenient.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Post Your Item</h3>
                <p className="text-gray-600">
                  Take a photo, add a description, set your price, and list it on the marketplace.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect with Buyers</h3>
                <p className="text-gray-600">
                  Interested students will contact you to purchase your item.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-muted rounded-full p-4 mb-4">
                  <Book className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Meet on Campus</h3>
                <p className="text-gray-600">
                  Arrange a safe meeting place on campus to complete the transaction.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Categories */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
              <p className="mt-4 text-xl text-gray-600">
                Browse our most popular categories to find what you need.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Textbooks", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1740" },
                { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1740" },
                { name: "Furniture", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1470" },
                { name: "Clothing", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1470" }
              ].map((category, index) => (
                <Card key={index} className="overflow-hidden group relative h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-50">
                    <h3 className="text-white font-semibold text-xl">{category.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Safe Campus Trading</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                We prioritize safety and convenience when buying and selling within your campus community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3">Campus Verified</h3>
                <p className="text-gray-600">
                  All users are verified students from your campus, creating a safer, more trusted community.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3">Face-to-Face Exchange</h3>
                <p className="text-gray-600">
                  Meet in person on campus to complete transactions, eliminating shipping hassles.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3">Stay in Touch</h3>
                <p className="text-gray-600">
                  Our platform helps you communicate with buyers and sellers safely and efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
