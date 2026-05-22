import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import agent from "../../api/agent";
import type { Blog } from "../../models/blog";
import { routes } from "../../router/routes";
import { formatDisplayDate } from "../../utils/formatDisplayDate";
import { getEstimatedReadTime } from "../../utils/getEstimatedReadTime";

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
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !blog) {
    return <Navigate to={routes.blogs} replace />;
  }

  const { estimatedReadTime } = getEstimatedReadTime(blog.content);
  const paragraphs = blog.content.split("\n\n").filter(Boolean);

  return (
    <Box>
      <Button
        component={Link}
        to={routes.blogs}
        startIcon={<ArrowBack />}
        sx={{ mb: 4 }}
      >
        Back to Blogs
      </Button>

      <Box sx={{ mb: 5, maxWidth: 900 }}>
        <Chip
          label={blog.categoryName}
          sx={{
            mb: 3,
            bgcolor: "rgba(255,95,25,0.08)",
            color: "primary.dark",
            fontWeight: 700,
          }}
        />

        <Typography variant="h2" sx={{ mb: 2, lineHeight: 1.1 }}>
          {blog.title}
        </Typography>

        <Typography color="text.secondary">
          Published {formatDisplayDate(new Date(blog.createdAt))} •{" "}
          {estimatedReadTime} min read
        </Typography>
      </Box>

      <Divider sx={{ mb: 5 }} />

      <Box
        sx={{
          maxWidth: 820,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {paragraphs.map((paragraph) => (
          <Typography
            key={paragraph}
            sx={{
              lineHeight: 1.9,
              fontSize: "1.08rem",
              color: "text.primary",
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}