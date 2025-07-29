
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, setUser } from "@/features/auth/authSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, Smartphone, Laptop, Headphones } from "lucide-react";
import { useState } from "react";

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Provide a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Attempting login with:", { email: data.email });
      
      const response = await login(data).unwrap();
      
      console.log("Login response:", response);
      
      if (response?.status === "success" && response?.data) {
        dispatch(setUser(response.data));
        
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        
        console.log("Login successful, navigating to home");
        navigate("/");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
    return "Login failed. Please try again.";
  };

  return (
    <div className="min-h-screen bg-orange-500 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="flex flex-col justify-center px-8 xl:px-12 relative z-10 text-white">
          {/* Brand Logo */}
          <div className="mb-6 xl:mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-2">TechMark</h1>
            <div className="w-12 xl:w-16 h-1 bg-white rounded-full"></div>
          </div>

          {/* Tagline */}
          <div className="mb-8 xl:mb-12">
            <h2 className="text-xl xl:text-2xl font-light mb-4 xl:mb-6 leading-relaxed">
              Your Gateway to Premium Electronics
            </h2>
            <p className="text-base xl:text-lg opacity-90 mb-6 xl:mb-8 leading-relaxed">
              Discover the latest smartphones, laptops, headphones and cutting-edge tech accessories all in one place.
            </p>
          </div>

          {/* Feature Icons */}
          <div className="flex space-x-6 xl:space-x-8 mb-8 xl:mb-12">
            <div className="flex flex-col items-center group">
              <div className="w-12 xl:w-16 h-12 xl:h-16 bg-white/20 rounded-xl xl:rounded-2xl flex items-center justify-center mb-2 xl:mb-3 group-hover:bg-white/30 transition-all duration-300">
                <Smartphone className="w-6 xl:w-8 h-6 xl:h-8" />
              </div>
              <span className="text-xs xl:text-sm font-medium">Smartphones</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-12 xl:w-16 h-12 xl:h-16 bg-white/20 rounded-xl xl:rounded-2xl flex items-center justify-center mb-2 xl:mb-3 group-hover:bg-white/30 transition-all duration-300">
                <Laptop className="w-6 xl:w-8 h-6 xl:h-8" />
              </div>
              <span className="text-xs xl:text-sm font-medium">Laptops</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-12 xl:w-16 h-12 xl:h-16 bg-white/20 rounded-xl xl:rounded-2xl flex items-center justify-center mb-2 xl:mb-3 group-hover:bg-white/30 transition-all duration-300">
                <Headphones className="w-6 xl:w-8 h-6 xl:h-8" />
              </div>
              <span className="text-xs xl:text-sm font-medium">Audio</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-2 xl:space-y-3">
            <div className="flex items-center text-xs xl:text-sm opacity-90">
              <div className="w-1.5 xl:w-2 h-1.5 xl:h-2 bg-white rounded-full mr-2 xl:mr-3"></div>
              Authentic Products with Warranty
            </div>
            <div className="flex items-center text-xs xl:text-sm opacity-90">
              <div className="w-1.5 xl:w-2 h-1.5 xl:h-2 bg-white rounded-full mr-2 xl:mr-3"></div>
              Fast & Secure Delivery
            </div>
            <div className="flex items-center text-xs xl:text-sm opacity-90">
              <div className="w-1.5 xl:w-2 h-1.5 xl:h-2 bg-white rounded-full mr-2 xl:mr-3"></div>
              24/7 Customer Support
            </div>
          </div>
        </div>

      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-0 relative min-h-screen lg:min-h-0">
        {/* Mobile Brand Header */}
        <div className="absolute top-6 left-4 sm:left-6 lg:hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-orange-500">TechMark</h1>
        </div>

        <div className="w-full max-w-sm sm:max-w-md space-y-6 mt-16 lg:mt-0">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-sm sm:text-base text-gray-600">Sign in to your TechMark account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-xs sm:text-sm text-red-700 text-center font-medium">
                  {getErrorMessage(error)}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center space-y-3">
            <Link
              to="/forgot-password"
              className="block text-xs sm:text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              Forgot your password?
            </Link>
            
            <div className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200"
              >
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;