import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import agent from "../../api/agent";
import { routes } from "../../router/routes";

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUnsubscribe = async () => {
    if (!token) {
      setError("Invalid unsubscribe link.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await agent.Newsletter.unsubscribeByToken(token);
      setMessage(response.message);
    } catch {
      setError("Unable to unsubscribe. This link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>
          Unsubscribe
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Click the button below to unsubscribe from Ali&apos;s Dev Journal.
        </Typography>

        {message && (
          <Typography color="success.main" sx={{ mb: 3 }}>
            {message}
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        {!message && (
          <Button
            variant="contained"
            onClick={handleUnsubscribe}
            disabled={loading || !token}
          >
            {loading ? <CircularProgress size={22} /> : "Unsubscribe"}
          </Button>
        )}

        <Box sx={{ mt: 3 }}>
          <Button component={Link} to={routes.home}>
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
