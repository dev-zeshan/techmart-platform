import { ShoppingCart, Search, Heart } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { useSelector } from "react-redux"
import Logout from "@/pages/auth/logout"
import { Link } from "react-router-dom"

const headerIcons = [
  {icon: <Search/>},
  {icon: <Heart/>},
  {icon: <ShoppingCart/>}
]

const navlist = [
    {label:"HOME", href:"/"},
    {label:"PRODUCTS", href:"/home/products"},
]

const Header = ({navItems=navlist, icons=headerIcons}) => {
  const user = useSelector((state)=>state.auth.user)
  return (
    <header className="bg-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">

        <div className="flex items-center space-x-2">
          <div className="font-bold ">
            <h2>Tech<span className="text-orange-500">Mart</span></h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
        <nav className="hidden md:flex space-x-6 font-medium text-sm">
          {navItems.map(({label, href})=>(
            <Link 
              key={label}
              to={href}
              className="relative text-gray-700 hover:text-red-600 transition"
            >
              {label}
            </Link>
          ))}

        </nav>
        </div>


        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
             {headerIcons.map((item, index) => (
            <Button key={index} size="icon" variant="ghost">
              {item.icon}
            </Button>
          ))}
            
          {!user && (
            <div className="flex items-center space-x-2 ml-4">
            <Link
            to="/login" 
          className="px-4 py-1 text-sm rounded-md text-orange-500 bg-white border-gray-200"
          >
            Sign In
          </Link>
          <Link
          to="/signup"
          className="px-4 py-1 text-sm rounded-md text-white bg-orange-500 hover:bg-orange-600"
          >
            Sign up

          </Link>
          </div>
          )}
          
          {user && <Logout/>}
          
          </div>
        </div>

      </div>

    </header>
  )
}

export default Header