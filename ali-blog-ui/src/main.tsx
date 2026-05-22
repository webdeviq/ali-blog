import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import "./index.css";
import { router } from "./app/router/routes.tsx";

import { theme } from "./app/theme/theme";

import AuthProvider from "./app/auth/AuthProvider";
import { NotificationProvider } from "./app/notifications/NotificationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  </ThemeProvider>,
);
