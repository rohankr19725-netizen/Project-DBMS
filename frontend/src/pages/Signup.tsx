import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight, Sparkles } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !username || !phone || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate college email domain
    const collegeDomains = ['.edu', '.ac.in', '.edu.in', 'university.', 'college.'];
    const isCollegeEmail = collegeDomains.some(domain => email.toLowerCase().includes(domain));
    
    if (!isCollegeEmail) {
      toast.error("Please use your college/university email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, {
        name,
        username,
        phone,
        email,
        password,
      }, {
        withCredentials: true,
      });

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Light Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <Link to="/" className="inline-block mb-6">
          <h1 className="text-3xl font-bold text-pink-600 flex items-center gap-2">
            CampusMarket
            <Sparkles className="h-6 w-6" />
          </h1>
        </Link>

        {/* Form Card */}
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/40">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join the campus marketplace today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-gray-700 text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="pl-10 h-11 rounded-xl border-gray-200 bg-white/80 focus:bg-white focus:border-pink-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-gray-700 text-sm font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  required
                  className="pl-10 h-11 rounded-xl border-gray-200 bg-white/80 focus:bg-white focus:border-pink-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-gray-700 text-sm font-medium">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(123) 456-7890"
                  required
                  className="pl-10 h-11 rounded-xl border-gray-200 bg-white/80 focus:bg-white focus:border-pink-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700 text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  required
                  className="pl-10 h-11 rounded-xl border-gray-200 bg-white/80 focus:bg-white focus:border-pink-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 h-11 rounded-xl border-gray-200 bg-white/80 focus:bg-white focus:border-pink-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 group mt-6" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-pink-600 hover:text-pink-700">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
