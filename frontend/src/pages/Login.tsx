import axios from "axios"; 
import React, { useState } from "react";
import AuthFormLayout from "@/components/AuthFormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  setIsLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/login", // your backend login route
      { email, password },
      { withCredentials: true } // important for sessions
    );

    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (err: any) {
    toast.error(err?.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <AuthFormLayout
      title="Log in to your account"
      subtitle="New to CampusMarket?"
      linkText="Sign up for free"
      linkTo="/signup"
      linkLabel="Don't have an account?"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            required
            className="mt-1"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Forgot your password?
              </a>
            </div>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthFormLayout>
  );
};

export default Login;
