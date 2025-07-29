import { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Logout from "../pages/logout";
import {
  Menu as MenuIcon,
  Settings,
  User,
  ShoppingCart,
  Home,
  Package,
  LayoutDashboard,
} from "lucide-react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={() => setToggled(!toggled)}
      breakPoint="md"
      width="256px"
      collapsedWidth="64px"
      backgroundColor="purple"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white bg-purple-700">
        {!collapsed && (
          <div className="flex items-center text-xl font-bold">
            <Settings className="w-5 h-5 mr-2" />
            Admin
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Menu */}
      <Menu className="text-white bg-purple-700">
        <MenuItem>
          <Link to="/admin/dashboard" className="flex items-center">
            <LayoutDashboard className="w-5 h-5 mr-2" />
            {!collapsed && "Dashboard"}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/" className="flex items-center">
            <Home className="w-5 h-5 mr-2" />
            {!collapsed && "Home"}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/admin/product" className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            {!collapsed && "Products"}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/admin/user" className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {!collapsed && "User"}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/admin/order" className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {!collapsed && "Orders"}
          </Link>
        </MenuItem>

        {/* Category / Subcategory */}
        <SubMenu label={!collapsed ? "More" : ""}>
          <MenuItem>
            <Link to="/admin/category" className="text-white">
              {!collapsed && "Category"}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/admin/subcategory" className="text-white">
              {!collapsed && "Subcategory"}
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>

      {/* Logout */}
      <div className="mt-60 px-4 text-white">
        <Logout />
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setToggled(!toggled)}
        className="fixed top-4 left-4 z-50 p-2 text-white bg-teal-600 rounded-md lg:hidden"
      >
        <MenuIcon className="w-5 h-5" />
      </button>
    </ProSidebar>
  );
}

export default Sidebar;
