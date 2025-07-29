import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-8xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-medium text-gray-600">Page Not Found</h2>
        <p className="text-gray-600">
          The page you're looking for doesn't exist.
        </p>
        
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={goHome}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded transition-colors"
          >
            Go Home
          </button>
          <button
            onClick={goBack}
            className="bg-gray-600 hover:bg-gray-900 text-white font-medium px-6 py-2 rounded transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}