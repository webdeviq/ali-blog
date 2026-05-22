import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";

import HomePage from "../features/home/HomePage";
import BlogListPage from "../features/blogs/BlogListPage";
import BlogDetailsPage from "../features/blogs/BlogDetailsPage";

import UnsubscribePage from "../features/home/UnsubscribePage";

import LoginPage from "../account/LoginPage";
import AdminDashboard from "../admin/AdminDashboard";
import BlogEditorPage from "../admin/BlogEditorPage";
import RequireAuth from "../auth/RequireAuth";
import AboutPage from "../features/about/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blogs", element: <BlogListPage /> },
      { path: "blogs/:slug", element: <BlogDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "unsubscribe", element: <UnsubscribePage /> },
      { path: "about", element: <AboutPage /> },
      {
        element: <RequireAuth roles={["Admin"]} />,
        children: [
          { path: "admin", element: <AdminDashboard /> },
          { path: "admin/posts/new", element: <BlogEditorPage /> },
          { path: "admin/posts/:slug/edit", element: <BlogEditorPage /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
