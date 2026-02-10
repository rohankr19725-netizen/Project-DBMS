
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface AuthFormLayoutProps {
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  linkLabel: string;
  children: React.ReactNode;
}

const AuthFormLayout = ({ 
  title, 
  subtitle, 
  linkText, 
  linkTo, 
  linkLabel, 
  children 
}: AuthFormLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center py-12 mt-16 sm:px-6 lg:px-8 bg-muted">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}{" "}
            <Link to={linkTo} className="font-medium text-primary hover:text-primary/80">
              {linkText}
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
            
            <div className="text-sm text-center mt-6 text-gray-500">
              {linkLabel}{" "}
              <Link to={linkTo} className="font-medium text-primary hover:text-primary/80">
                {linkText}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthFormLayout;
