import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";

import HomePage from "../features/home/HomePage";

import BlogListPage from "../features/blogs/BlogListPage";
import LoginPage from "../account/LoginPage";
import AdminDashboard from "../admin/AdminDashboard";
import BlogDetailsPage from "../features/blogs/BlogDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blogs", element: <BlogListPage /> },
      { path: "blogs/:slug", element: <BlogDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
