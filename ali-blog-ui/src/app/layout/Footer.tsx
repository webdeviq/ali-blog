import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "../router/routes";

const linkSx = {
  color: "text.secondary",
  fontWeight: 700,
  px: 1.25,
  "&:hover": {
    color: "primary.main",
    bgcolor: "primary.light",
  },
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{
            py: 4.5,
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            sx={{
              alignItems: "center",
              color: "text.primary",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 900,
                fontSize: 14,
                boxShadow: "0 10px 24px rgba(249,115,22,0.22)",
              }}
            >
              IQ
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 18,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
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

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <Button component={Link} to={routes.home} size="small" sx={linkSx}>
              Home
            </Button>

            <Button component={Link} to={routes.blogs} size="small" sx={linkSx}>
              Blogs
            </Button>

            <Button
              component="a"
              href="https://github.com/webdeviq"
              target="_blank"
              rel="noreferrer"
              size="small"
              sx={linkSx}
            >
              GitHub
            </Button>

            <Button
              component="a"
              href="https://linkedin.com/in/ali-a-519711217"
              target="_blank"
              rel="noreferrer"
              size="small"
              sx={linkSx}
            >
              LinkedIn
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Copyright {new Date().getFullYear()} FullStackIQ
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
