
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "@/components/shared/Header";
import Footer from "../../components/shared/Footer";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.auth.user?.role === "admin");

  return (
    <div className="font-sans bg-gray-100">
      <div className="sticky top-0 z-50 border border-gray-200 bg-white/90 backdrop-blur-lg">
        {/* <Header
          title="TechMart"
          actions={[
            <a
              href="#features"
              key="features"
              className=" text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              FEATURES
            </a>,
            <a
              href="#about"
              key="about"
              className=" text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              ABOUT
            </a>,
            <a
              href="#contact"
              key="contact"
              className=" text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              CONTACT
            </a>,
            admin && (
              <Link
                to="/admin/dashboard"
                className="text-lg font-medium text-orange-500 transition-colors duration-200 hover:text-orange-600"
              >
                Admin
              </Link>
            ),
            !user && (
              <Link
                to="/login"
                key="login"
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-200 rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-600 hover:text-white transform hover:scale-105"
              >
                Sign In
              </Link>
            ),
            !user && (
              <Link
                to="/signup"
                key="signup"
                className="px-6 py-2.5 text-sm font-semibold transition-all duration-200 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-500 transform hover:scale-105 shadow-lg"
              >
                Sign Up
              </Link>
            ),
          ]}
        /> */}
        <Header/>
      </div>

      <section
        className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center bg-gray-100"
      >
        <div className="absolute inset-0 bg-gray-100/50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-orange-500 border rounded-full bg-orange-500/20 backdrop-blur-sm border-orange-500/30">
            Welcome to the Future
          </div>
          
          <h1 className="mb-6 text-4xl font-black md:text-6xl lg:text-7xl">
            <span className="text-orange-500">
              TechMart
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto mb-10 text-xl leading-relaxed text-gray-900 md:text-2xl">
            Build amazing things with cutting-edge technology. Let's create something
            <span className="font-semibold text-orange-600"> extraordinary </span>
            together.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/home/products"
              className="px-6 py-2 text-lg font-bold text-white transition-all duration-300 transform border shadow-2xl group bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:shadow-orange-500/25 hover:scale-105 hover:from-orange-500 hover:to-orange-600 hover:text-white border-border/50"
            >
              <span className="flex items-center gap-2">
                Let's Explore
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
            
            <button className="px-6 py-2 text-lg font-semibold text-orange-500 transition-all duration-300 transform border-2 border-orange-500/30 rounded-xl hover:bg-orange/10 hover:border-white hover:scale-105 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2 animate-bounce">
          <div className="flex justify-center w-8 h-12 border-2 rounded-full border-white/50">
            <div className="w-1 h-3 mt-2 rounded-full bg-white/70 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-20 bg-gradient-to-br from-background via-white to-background"
      >
        <div className="px-6 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-orange-500 rounded-full bg-orange-500/10">
              ✨ Features
            </div>
            <h2 className="mb-6 text-5xl font-bold text-gray-900">
              Why Choose ElectroHub?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500">
              Discover the powerful features that make us stand out from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Lightning Fast",
                description: "Experience blazing-fast performance that keeps you ahead of the competition.",
                icon: "⚡",
                gradient: "from-orange-500/20 to-orange-600/20"
              },
              {
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee for peace of mind.",
                icon: "🔒",
                gradient: "from-orange-600/20 to-orange-500/20"
              },
              {
                title: "Smart Analytics",
                description: "Get detailed insights and analytics to make data-driven decisions.",
                icon: "📊",
                gradient: "from-orange-500/20 to-orange-600/20"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 transition-all duration-500 transform bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 border border-border/50 hover:border-orange-500/30 overflow-hidden`}
              >
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-orange-500/5 to-transparent group-hover:opacity-100"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 mb-6 text-3xl shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl">
                    {feature.icon}
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-bold text-orange-500 transition-colors duration-300 group-hover:text-orange-600">
                    {feature.title}
                  </h3>
                  
                  <p className="transition-colors duration-300 text-gray-900 group-hover:text-textorange-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-20 bg-gradient-to-r from-orange-500/5 via-orange-600/5 to-orange-500/5"
      >
        <div className="max-w-6xl px-6 mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-orange-500 bg-white border rounded-full border-orange-500/20">
            🚀 About Us
          </div>
          
          <h2 className="mb-8 text-5xl font-bold text-orange-500">
            Building the Future, Today
          </h2>
          
          <p className="max-w-4xl mx-auto mb-12 text-xl leading-relaxed text-orange-600">
            We are a passionate team of innovators, designers, and engineers working towards 
            building revolutionary solutions for tomorrow's challenges. Our mission is to create 
            impactful, high-quality products that transform industries and improve lives.
          </p>

          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-black text-orange-500">{stat.number}</div>
                <div className="font-medium text-orange-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600"
      >
        <div className="max-w-4xl px-6 mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white rounded-full bg-white/20 backdrop-blur-sm">
            💬 Get In Touch
          </div>
          
          <h2 className="mb-6 text-5xl font-bold text-white">
            Ready to Get Started?
          </h2>
          
          <p className="mb-12 text-xl text-white/80">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="px-6 py-2 text-lg font-bold transition-all duration-300 transform border shadow-2xl group text-textorange-500 bg-gradient-to-r from-white to-gray-100 rounded-xl hover:shadow-white/25 hover:scale-105 border-white/20">
              <span className="flex items-center gap-2">
                Send Message
                <span className="transition-transform duration-300 group-hover:translate-x-1">✉️</span>
              </span>
            </button>
            
            <button className="px-6 py-2 text-lg font-semibold text-white transition-all duration-300 transform border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white hover:scale-105 backdrop-blur-sm">
              Schedule Call
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-white bg-gradient-to-r from-orange-500 to-orange-600">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;