import { lazy } from "react";

// Public Pages
export const LandingPage = lazy(() => import("../pages/PublicPages/LandingPage"));
export const Products = lazy(() => import("../components/ProductsList"));
export const ProductDetails = lazy(() => import("../pages/PublicPages/ProductDetails"));
export const Categories = lazy(() => import("../pages/categories/categories"));
export const SubCategories = lazy(() => import("../pages/categories/subCategoriesList"));
export const OrderCreate = lazy(() => import("../components/orders/Order"));

// Auth
export const Signup = lazy(() => import("../pages/auth/signup"));
export const Login = lazy(() => import("../pages/auth/login"));
export const Logout = lazy(() => import("../pages/auth/logout"));

// Layouts
export const HomeLayout = lazy(() => import("../components/layout/HomeLayout"));
export const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));

// Dashboard/Admin
export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
export const Product = lazy(() => import("../pages/products/Product"));
export const ProductForm = lazy(() => import("../components/products/ProductForm"));
export const Orders = lazy(() => import("../pages/orders/Order"));
export const Users = lazy(() => import("../pages/users/Users"));
export const Category = lazy(() => import("../pages/categories/Category"));
export const Subcategory = lazy(() => import("../pages/SubCategory"));
export const UserForm = lazy(() => import("../components/users/UserForm"));

// Utils
export const NotFound = lazy(() => import("../pages/NotFound"));
export const Cart = lazy(() => import("../pages/payments/Cart"));
export const ProtectedRoute = lazy(() => import("../ProtectedRoute"));
