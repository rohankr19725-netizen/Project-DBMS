import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import CategoryFilter from "@/components/CategoryFilter";
import ScrollToTop from "@/components/ScrollToTop";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/listings`);
        setListings(res.data); // expecting an array of listings
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" || listing.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1 pt-20 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 rounded-full border-gray-200 focus:border-pink-500 shadow-sm bg-white"
                />
              </div>
              <CategoryFilter 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <Button variant="outline" size="icon" className="rounded-full">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-pink-600">{filteredListings.length}</p>
              <p className="text-xs text-gray-600">Items Available</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-purple-600">24/7</p>
              <p className="text-xs text-gray-600">Always Open</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-blue-600">Fast</p>
              <p className="text-xs text-gray-600">Quick Delivery</p>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredListings.map((listing) => (
                <ListingCard 
                  key={listing._id}
                  id={listing._id}
                  title={listing.title}
                  price={listing.price}
                  image={listing.image}
                  description={listing.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-7xl mb-4">🔍</div>
              <p className="text-xl text-gray-900 font-semibold">No items found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
