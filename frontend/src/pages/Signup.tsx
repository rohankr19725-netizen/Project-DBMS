import axios from "axios"; // ⬅️ Import Axios at the top
import React, { useState } from "react";
import AuthFormLayout from "@/components/AuthFormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

  setIsLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/signup", {
      name,
      username,
      phone,
      email,
      password,
    }, {
      withCredentials: true, // ⬅️ if you're using cookies/session in backend
    });

    toast.success("Account created successfully!");
    navigate("/home");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Signup failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <AuthFormLayout
      title="Create an account"
      subtitle="Already have an account?"
      linkText="Log in"
      linkTo="/login"
      linkLabel="Already have an account?"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(123) 456-7890"
            required
            className="mt-1"
          />
        </div>

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
          <Label htmlFor="password">Password</Label>
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

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-6" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthFormLayout>
  );
};

export default Signup;