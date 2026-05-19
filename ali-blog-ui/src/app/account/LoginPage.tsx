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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    setSubmitting(true);

    try {
      const user = await agent.Account.login({ username, password });
      login(user);
      navigate(from, { replace: true });
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
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            disabled={!username.trim() || !password.trim() || submitting}
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
