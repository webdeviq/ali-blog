import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../api/agent";

import type { Blog } from "../../models/blog";
import BlogCard from "./components/BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching blogs");
    agent.BlogPosts.list()
      .then((response) => {
        setBlogs(response.content);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Blog
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 680 }}>
        Technical notes, project updates, and lessons from building real
        software.
      </Typography>

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
