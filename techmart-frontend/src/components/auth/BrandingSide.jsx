import { Smartphone, Laptop, Headphones } from "lucide-react";

function BrandingSide() {
  return (
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
  );
}

export default BrandingSide;