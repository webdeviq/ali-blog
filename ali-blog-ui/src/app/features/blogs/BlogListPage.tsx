import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import agent from "../../api/agent";
import type { Blog } from "../../models/blog";
import BlogCard from "./components/BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    agent.BlogPosts.list()
      .then((response) => setBlogs(response.content))
      .catch(() =>
        setError("Unable to load blog posts. Please try again later."),
      )
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

      {error ? (
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 4, mb: 5, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="h4">{blogs.length}</Typography>
              <Typography color="text.secondary">Articles</Typography>
            </Box>

            <Box>
              <Typography variant="h4">Spring Boot</Typography>
              <Typography color="text.secondary">Backend Stack</Typography>
            </Box>

            <Box>
              <Typography variant="h4">React / C#</Typography>
              <Typography color="text.secondary">Full-Stack Roots</Typography>
            </Box>
          </Box>

          {blogs.length === 0 ? (
            <Typography color="text.secondary">
              No blog posts are available yet.
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
        </>
      )}
    </Box>
  );
}
