import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import type { Blog } from "../../models/blog";
import { formatDisplayDate } from "../../utils/formatDisplayDate";
import { getEstimatedReadTime } from "../../utils/getEstimatedReadTime";
import { routes } from "../../router/routes";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [notFound, setNotFound] = useState(!slug);

  useEffect(() => {
    if (!slug) return;

    agent.BlogPosts.details(slug)
      .then(setBlog)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <CircularProgress />;
  }

  if (notFound || !blog) {
    return <Navigate to={routes.blogs} replace />;
  }

  const { estimatedReadTime } = getEstimatedReadTime(blog.content);

  return (
    <Box>
      <Chip
        label={blog.tag}
        sx={{
          mb: 3,
          bgcolor: "rgba(255,95,25,0.08)",
          color: "primary.dark",
          fontWeight: 700,
        }}
      />

      <Typography variant="h2" sx={{ mb: 2, maxWidth: 900 }}>
        {blog.title}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Published {formatDisplayDate(new Date(blog.createdAt))} •{" "}
        {estimatedReadTime} min read
      </Typography>

      <Divider sx={{ mb: 5 }} />

      <Box
        sx={{
          maxWidth: 820,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {blog.content.split("\n\n").map((paragraph) => (
          <Typography
            key={paragraph}
            sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
