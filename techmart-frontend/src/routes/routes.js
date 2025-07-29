import PATHS from "./paths";
import * as Pages from "./routeComponents";

const routes = [
  { path: PATHS.MAIN, element: <Pages.LandingPage /> },
  { path: PATHS.SIGNUP, element: <Pages.Signup /> },
  { path: PATHS.LOGIN, element: <Pages.Login /> },

  {
    path: PATHS.HOME,
    element: <Pages.HomeLayout />,
    children: [
      { path: "cart", element: <Pages.Cart /> },
      { path: "products", element: <Pages.Products /> },
      { path: "product/:id", element: <Pages.ProductDetails /> },
      { path: "categories", element: <Pages.Categories /> },
      { path: "subcategories", element: <Pages.SubCategories /> },
      { path: "order", element: <Pages.OrderCreate /> },
    ],
  },

  {
    path: PATHS.ADMIN,
    element: <Pages.AdminLayout />,
    children: [
      {
        element: <Pages.ProtectedRoute />,
        children: [
          { path: PATHS.DASHBOARD, element: <Pages.Dashboard /> },
          { path: PATHS.PRODUCT, element: <Pages.Product /> },
          { path: PATHS.USER, element: <Pages.Users /> },
          { path: PATHS.ORDER, element: <Pages.Orders /> },
          { path: "category", element: <Pages.Category /> },
          { path: "subcategory", element: <Pages.Subcategory /> },
          { path: "customer/update/:id", element: <Pages.UserForm isUpdate /> },
          { path: "customer/create", element: <Pages.UserForm /> },
          { path: "product/update/:id", element: <Pages.ProductForm isUpdate /> },
          { path: "product/create", element: <Pages.ProductForm /> },
          { path: "logout", element: <Pages.Logout /> },
        ],
      },
    ],
  },

  { path: "*", element: <Pages.NotFound /> },
];

export default routes;
