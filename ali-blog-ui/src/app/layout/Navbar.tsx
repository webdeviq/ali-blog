import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router-dom";

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
              to="/"
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

            <Button component={NavLink} to="/blogs" sx={navLinkStyles}>
              Blog
            </Button>

            <Button component={NavLink} to="/login" sx={navLinkStyles}>
              Login
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
