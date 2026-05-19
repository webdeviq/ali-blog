import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import agent from "../api/agent";

import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { routes } from "../router/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    setSubmitting(true);
    setError("");

    try {
      const response = await agent.Account.login({ email, password });

      login({ email, token: response.token, roles: ["Admin"] });

      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password");
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
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
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
            disabled={!email.trim() || !password.trim() || submitting}
            variant="contained"
            size="large"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
