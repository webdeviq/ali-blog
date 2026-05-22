import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { routes } from "../router/routes";

export default function Footer() {
  return (
    <Box sx={{ mt: 10 }}>
      <Divider />

      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            py: 4,
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography sx={{ fontWeight: 800 }}>Ali Dev Journal</Typography>

          <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
            <Button component={Link} to={routes.home} size="small">
              Home
            </Button>

            <Button component={Link} to={routes.blogs} size="small">
              Blogs
            </Button>

            <Button
              component="a"
              href="https://github.com/webdeviq"
              target="_blank"
              rel="noreferrer"
              size="small"
            >
              GitHub
            </Button>

            <Button
              component="a"
              href="https://linkedin.com/in/ali-a-519711217"
              target="_blank"
              rel="noreferrer"
              size="small"
            >
              LinkedIn
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Ali Dev Journal
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
