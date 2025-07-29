import { useState } from "react";
import PropTypes from "prop-types";
import { Menu , X} from "lucide-react";

function Header({ title, actions, profile, className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`flex justify-between items-center p-4 ${className}`}>
      {/* Logo/Title */}
      <div className="flex items-center">
        <div className="text-3xl font-black text-orange-500 bg-clip-text">
          {title}
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {actions && (
          <div className="items-center hidden space-x-8 lg:flex">
            {actions.map((action, index) => (
              <div
                key={index}
                className="relative group text-sm"
              >
                {action}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        )}

        {profile && (
          <div className="relative group">
            <div className="flex items-center justify-center w-12 h-12 font-bold transition-all duration-300 transform border-2 rounded-full shadow-lg text-surface bg-gradient-to-br from-orange-500 to-orange-600 group-hover:scale-110 group-hover:shadow-xl border-surface/20">
              {profile.initial || "?"}
            </div>
            <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-br from-orange-500 to-orange-600 group-hover:opacity-20"></div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="relative p-3 transition-all duration-300 transform shadow-lg text-surface bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/30"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <Menu 
                className={`absolute transition-all duration-300 transform ${
                  isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              />
              <X 
                className={`absolute transition-all duration-300 transform ${
                  isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={toggleMenu}
          ></div>
          
          <div className="fixed top-0 right-0 z-50 h-full transition-all duration-300 transform border-l shadow-2xl w-80 bg-gradient-to-br from-surface via-background to-surface lg:hidden border-border">
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-2xl font-black text-transparent bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text">
                  {title}
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 transition-colors duration-200 rounded-lg text-orange-500 hover:text-orange-600 hover:bg-primary/10"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-6">
                {actions && actions.map((action, index) => (
                  <div
                    key={index}
                    className="relative p-4 transition-all duration-300 border border-transparent group rounded-xl hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-500/10 hover:border-orange-500/20"
                    onClick={toggleMenu}
                  >
                    <div className="font-medium transition-colors duration-200 text-orange-500 group-hover:text-orange-500">
                      {action}
                    </div>
                    <div className="absolute bottom-0 left-4 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-8"></div>
                  </div>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-8 left-6 right-6">
                <div className="p-4 border bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl border-orange-500/20">
                  <div className="text-sm text-center text-text-secondary">
                    Need help? Contact our support team
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  profile: PropTypes.shape({
    initial: PropTypes.string,
  }),
  className: PropTypes.string,
};

export default Header;