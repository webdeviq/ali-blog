import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

import agent from "../../api/agent";
import { useNotification } from "../../notifications/useNotification";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { showNotification } = useNotification();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubscribe = async () => {
    if (!isValidEmail) return;

    setSubmitting(true);

    try {
      const response = await agent.Newsletter.subscribe({
        email: email.trim(),
      });

      showNotification(response.message, "success");
      setEmail("");
    } catch {
      showNotification(
        "This email is already subscribed or could not be registered.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 8,
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        background:
          "radial-gradient(circle at top right, rgba(255,95,25,0.12), transparent 35%), #fff",
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        <MarkEmailReadOutlinedIcon
          sx={{ color: "primary.main", fontSize: 38, mb: 2 }}
        />

        <Typography variant="h4" sx={{ mb: 1 }}>
          Stay updated
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
          Subscribe to get new posts about Java, Spring Boot, React,
          architecture, and real-world software lessons.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={Boolean(email.trim()) && !isValidEmail}
            helperText={
              Boolean(email.trim()) && !isValidEmail
                ? "Please enter a valid email address."
                : ""
            }
            sx={{ minWidth: { xs: "100%", sm: 320 } }}
          />

          <Button
            variant="contained"
            disabled={!isValidEmail || submitting}
            sx={{ px: 3 }}
            onClick={handleSubscribe}
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
