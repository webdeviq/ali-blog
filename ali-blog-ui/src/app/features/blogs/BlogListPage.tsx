import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import type { Blog } from "../../models/blog";
import BlogCard from "./components/BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.BlogPosts.list()
      .then((response) => setBlogs(response.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 1.2,
          }}
        >
          Developer Journal
        </Typography>

        <Typography
          variant="h2"
          sx={{
            mt: 1,
            mb: 2,
            maxWidth: 760,
            lineHeight: 1.1,
          }}
        >
          Thoughts, systems, architecture, and lessons from real-world software
          engineering.
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 760,
            lineHeight: 1.8,
            fontWeight: 400,
          }}
        >
          Writing about Java, Spring Boot, React, enterprise systems, APIs,
          architecture, and the challenges behind building production software.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4, mb: 5, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h4">{blogs.length}</Typography>
          <Typography color="text.secondary">Articles</Typography>
        </Box>

        <Box>
          <Typography variant="h4">Java</Typography>
          <Typography color="text.secondary">Main Stack</Typography>
        </Box>

        <Box>
          <Typography variant="h4">2026</Typography>
          <Typography color="text.secondary">Active Writing</Typography>
        </Box>
      </Box>

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
    </Box>
  );
}