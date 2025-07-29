import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation, setUser } from "../../features/auth/authSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import gad from "../../assets/gad.jpg"

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

  const [signup, { isLoading, isSuccess, error, data }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      if (!response?.data) {
        throw new Error("Signup failed");
      }
      dispatch(setUser(response.data));
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-100 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Brand/Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
          <img 
            src={gad} 
            alt="gadgets" 
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-orange-500 mb-2">
                Create an account
              </h2>
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  className="text-orange-500 hover:text-orange-400 font-medium"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  id="name"
                  className={`w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  id="email"
                  className={`w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  id="password"
                  className={`w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              className="w-full py-3 mt-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition duration-200 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            {error && (
              <div className="mt-4 text-red-400 text-center text-sm">
                <p>{error.message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;