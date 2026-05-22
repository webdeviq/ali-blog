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
  fontWeight: 700,
  fontSize: 14,
  color: "text.secondary",
  px: 1.5,
  borderRadius: 999,

  "&.active": {
    color: "primary.main",
    bgcolor: "rgba(255,95,25,0.08)",
  },

  "&:hover": {
    bgcolor: "rgba(255,95,25,0.08)",
    color: "primary.main",
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
        bgcolor: "rgba(255,255,255,0.86)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: 76 }}>
        <Container maxWidth="lg" disableGutters>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Stack
              component={NavLink}
              to={routes.home}
              direction="row"
              spacing={1.2}
              sx={{
                alignItems: "center",
                textDecoration: "none",
                color: "text.primary",
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 15,
                  boxShadow: "0 10px 24px rgba(255,95,25,0.28)",
                }}
              >
                IQ
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 22,
                    lineHeight: 1,
                    letterSpacing: "-0.045em",
                  }}
                >
                  FullStackIQ
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    color: "text.secondary",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Dev Journal
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Button component={NavLink} to={routes.blogs} sx={navLinkStyles}>
              Blogs
            </Button>
            <Button component={NavLink} to={routes.about} sx={navLinkStyles}>
              About
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
