import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation, setUser } from "../../features/auth/authSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import BrandingSide from "./BrandingSide";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters are required")
    .required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [signup, { isLoading, error }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Attempting signup with:", { name: data.name, email: data.email });
      
      const response = await signup(data).unwrap();
      
      console.log("Signup response:", response);
      
      if (response?.status === "success" && response?.data) {
        dispatch(setUser(response.data));
        
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        
        console.log("Signup successful, navigating to dashboard");
        navigate("/admin/dashboard");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const getErrorMessage = (error) => {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return "Signup failed. Please try again.";
  };

  return (
    <div className="min-h-screen bg-orange-500 flex">
      <BrandingSide />

      <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-0 relative min-h-screen lg:min-h-0">

        <div className="absolute top-6 left-4 sm:left-6 lg:hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-orange-500">TechMark</h1>
        </div>

        <div className="w-full max-w-sm sm:max-w-md space-y-6 mt-16 lg:mt-0">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-sm sm:text-base text-gray-600">Join TechMark and start shopping</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  errors.name ? 'text-red-500' : 'text-gray-600'
                }`} />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 ${
                    errors.name 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  errors.email ? 'text-red-500' : 'text-gray-600'
                }`} />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`w-full pl-10 pr-3 py-2.5 text-sm bg-white border rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  errors.password ? 'text-red-500' : 'text-gray-600'
                }`} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-white border rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 ${
                    errors.password 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  {...register("password")}
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-orange-500 focus:outline-none transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-xs sm:text-sm text-red-700 text-center font-medium">
                  {getErrorMessage(error)}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center">
                  Create Account
                </div>
              )}
            </button>
          </form>

          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;