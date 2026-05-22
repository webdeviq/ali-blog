import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

import { useNotification } from "../notifications/useNotification";
import { routes } from "../router/routes";

const navLinkStyles = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: 14,
  color: "text.secondary",
  px: 1.5,

  "&.active": {
    color: "text.primary",
  },

  "&:hover": {
    bgcolor: "transparent",
    color: "text.primary",
  },
};

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showNotification("Logged out successfully", "success");
    navigate(routes.home);
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Container maxWidth="lg" disableGutters>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography
              component={NavLink}
              to={routes.home}
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.04em",
              }}
            >
              Ali Dev Journal
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Button component={NavLink} to={routes.blogs} sx={navLinkStyles}>
              Blogs
            </Button>

            {isAuthenticated && (
              <>
                <Button
                  component={NavLink}
                  to={routes.admin}
                  sx={navLinkStyles}
                >
                  Admin
                </Button>

                <Button onClick={handleLogout} sx={navLinkStyles}>
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
