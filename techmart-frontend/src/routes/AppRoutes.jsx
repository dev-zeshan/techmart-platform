import { lazy } from "react";
import PATHS from "./paths.js";

import LandingPage from "../pages/PublicPages/LandingPage.jsx";
const Signup = lazy(() => import("../pages/auth/signup"));
const Login = lazy(() => import("../pages/auth/login"));
const Cart = lazy(() => import("../pages/payments/Cart.jsx"));
const NotFound = lazy(() => import("../pages/NotFound"));
const OrderCreate = lazy(() => import("../components/orders/Order.jsx"));

const HomeLayout = lazy(() => import("../components/layout/HomeLayout.jsx"));
const AdminLayout = lazy(() => import("../components/layout/AdminLayout.jsx"));

const Products = lazy(() => import("../components/products/ProductsList.jsx"));
const Categories = lazy(() => import("../pages/categories/categories.jsx"));
const SubCategories = lazy(
  () => import("../pages/categories/subCategoriesList.jsx")
);
const ProductDetails = lazy(
  () => import("../components/products/ProductDetails.jsx")
);

const ProtectedRoute = lazy(() => import("../ProtectedRoute"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Product = lazy(() => import("../pages/products/product.jsx"));
const Orders = lazy(() => import("../pages/orders/order"));
const Users = lazy(() => import("../pages/users/Users.jsx"));
const Category = lazy(() => import("../pages/categories/Category.jsx"));
const Subcategory = lazy(() => import("../pages/categories/SubCategory"));
const UserForm = lazy(() => import("../components/users/UserForm.jsx"));
const ProductForm = lazy(() => import("../components/products/ProductForm"));
const Logout = lazy(() => import("../pages/auth/logout"));

const routes = [
  { path: PATHS.MAIN, element: <LandingPage /> },
  { path: PATHS.SIGNUP, element: <Signup /> },
  { path: PATHS.LOGIN, element: <Login /> },
 
  {
    path: PATHS.HOME,
    element: <HomeLayout />,
    children: [
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "subcategories", element: <SubCategories /> },
      { path: "order", element: <OrderCreate /> },
    ],
  },

  {
    path: PATHS.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: PATHS.DASHBOARD, element: <Dashboard /> },
          { path: PATHS.PRODUCT, element: <Product /> },
          { path: PATHS.USER, element: <Users /> },
          { path: PATHS.ORDER, element: <Orders /> },
          { path: "category", element: <Category /> },
          { path: "subcategory", element: <Subcategory /> },
          { path: "customer/update/:id", element: <UserForm isUpdate /> },
          { path: "customer/create", element: <UserForm /> },
          { path: "product/update/:id", element: <ProductForm isUpdate /> },
          { path: "product/create", element: <ProductForm /> },
          { path: "logout", element: <Logout /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
];

export default routes;
