import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import agent from "../api/agent";
import { useAuth } from "../auth/useAuth";
import { useNotification } from "../notifications/useNotification";
import { routes } from "../router/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || routes.admin;

  const { login, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();

  const isFormValid = email.trim() && password.trim();

  const handleLogin = async () => {
    if (!isFormValid) return;

    setSubmitting(true);

    try {
      const response = await agent.Account.login({
        email: email.trim(),
        password,
      });

      login({ email: email.trim(), token: response.token, roles: ["Admin"] });

      showNotification("Logged in successfully", "success");
      navigate(from, { replace: true });
    } catch {
      showNotification("Invalid email or password", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={routes.admin} replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "65vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            sx={{
              mx: "auto",
              mb: 2,
              bgcolor: "rgba(255,95,25,0.08)",
              color: "primary.dark",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h5">Admin Login</Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Sign in to manage blog posts.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <Button
            disabled={!isFormValid || submitting}
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
