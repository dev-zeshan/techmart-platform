import { useState } from "react";
import { Link,  useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../pages/auth/logout";
import CartDisplay from "../pages/payments/Cart";
import { Search, Menu, ShoppingCart, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";



function HeaderHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleSearch = () => {
    searchParams.set("search", searchInput);
    setSearchParams(searchParams);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerActions = (
    <div className="flex space-x-8">
      <Link
        to="/"
        className="py-2 font-medium text-gray-600 transition-all duration-300 hover:text-gray-900"
      >
        Home
      </Link>
      <Link
        to="/home/products"
        className="py-2 font-medium text-gray-600 transition-all duration-300 hover:text-gray-900"
      >
        Products
      </Link>
      <Link
        to="/home/categories"
        className="py-2 font-medium text-gray-600 transition-all duration-300 hover:text-gray-900"
      >
        Categories
      </Link>
      <button
        onClick={openCart}
        className="py-2 font-medium text-gray-600 transition-all duration-300 hover:text-gray-900"
      >
        <ShoppingCart />
      </button>
      {!user && (
        <Link
          to="/login"
          className="py-2 font-medium text-gray-600 transition-all duration-300 hover:text-gray-900"
        >
          Login
        </Link>
      )}
      {!user && (
        <Link
          to="/signup"
          className="px-6 py-2 font-semibold text-white transition-all duration-300 bg-black rounded-full hover:text-purple-700"
        >
          Sign Up
        </Link>
      )}
      {user && <Logout />}
    </div>
  );

  return (
    <>
      <header className="shadow-md bg-background">
        <div className="flex items-center justify-between max-w-screen-xl p-2 mx-auto">
          <div className="text-2xl font-bold text-orange-500">
            <span>TechMart</span>
          </div>

          <div className="justify-center flex-grow hidden p-2 lg:flex">
            <div className="relative w-full max-w-md">
              <input
                value={searchInput}
                onChange={onChangeSearch}
                onKeyDown={handleKey}
                type="text"
                className="w-full p-2 text-gray-800 transition-all duration-300 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-900"
                placeholder="Search products..."
              />
              <button
                aria-label="Search"
                className="absolute px-2 py-2 text-gray-600 transition-all duration-200 transform -translate-y-1/2 rounded-full right-2 top-1/2 hover:text-black focus:outline-none"
                onClick={handleSearch}
              >
                <Search className="text-xl" />
              </button>
            </div>
          </div>

          <div className="hidden space-x-8 lg:flex">{headerActions}</div>

          <div className="lg:hidden">
            <button
              onClick={handleMenuToggle}
              className="p-2 text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none"
            >
              <Menu className="text-2xl" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="p-4 space-y-4 text-white bg-gray-100 lg:hidden">
            {headerActions.props.children.map((action, index) => (
              <div key={index} className="p-2 rounded-md hover:bg-orange-500">
                {action}
              </div>
            ))}
          </div>
        )}
      </header>

      <Dialog open={isCartOpen} onClose={closeCart}>
        <DialogContent
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "28%",
            height: "100%",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            overflowY: "auto",
          }}
        >
          <button
            onClick={closeCart}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <CartDisplay />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HeaderHome;
