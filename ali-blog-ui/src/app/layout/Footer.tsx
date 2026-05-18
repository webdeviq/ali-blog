import { Box, Container, Divider, Stack, Typography } from "@mui/material";

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
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            © {new Date().getFullYear()} Ali Dev Journal
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Built with React, TypeScript, Spring Boot, and caffeine.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}