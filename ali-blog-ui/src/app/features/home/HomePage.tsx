import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import agent from "../../api/agent";
import type { Blog } from "../../models/blog";
import { routes } from "../../router/routes";
import BlogCard from "../blogs/components/BlogCard";
import NewsletterSection from "./NewsletterSection";

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    agent.BlogPosts.list()
      .then((response) => setBlogs(response.content.slice(0, 3)))
      .catch(() =>
        setError("An error occurred loading the latest posts. Please try again later."),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(circle at top left, rgba(255,95,25,0.12), transparent 35%), #fff",
        }}
      >
        <Stack spacing={3}>
          <Chip
            icon={<CodeIcon />}
            label="Java • Spring Boot • React • TypeScript"
            sx={{
              width: "fit-content",
              bgcolor: "rgba(255,95,25,0.08)",
              color: "primary.dark",
              fontWeight: 700,
            }}
          />

          <Typography variant="h2" sx={{ maxWidth: 760 }}>
            Notes, builds, and lessons from my software engineering journey.
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ lineHeight: 1.7, maxWidth: 720 }}
          >
            A personal developer journal where I share what I learn while
            building real-world apps with Java, Spring Boot, React, TypeScript,
            C#, and enterprise systems.
          </Typography>

          <Box>
            <Button
              component={Link}
              to={routes.blogs}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 3, py: 1.2 }}
            >
              Read the blog
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Latest Articles
        </Typography>

        {loading ? (
          <Box sx={{ py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : blogs.length === 0 ? (
          <Typography color="text.secondary">
            No latest articles are available yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </Box>
        )}
      </Box>

      <NewsletterSection />
    </Box>
  );
}