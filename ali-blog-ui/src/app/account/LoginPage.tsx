import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { mockUser } from "../auth/mockUser";
import { routes } from "../router/routes";

export default function LoginPage() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const handleLogin = () => {
    login(mockUser);
    navigate(from, { replace: true });
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
          <TextField label="Username" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" size="large" onClick={handleLogin}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
