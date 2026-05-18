import { Box, Chip, Divider, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { mockBlogPosts } from "./mockBlogPosts";

export default function BlogDetailsPage() {
  const { slug } = useParams();

  const post = mockBlogPosts.find((blog) => blog.slug === slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <Box>
      <Chip
        label={post.tag}
        sx={{
          mb: 3,
          bgcolor: "rgba(255,95,25,0.08)",
          color: "primary.dark",
          fontWeight: 700,
        }}
      />

      <Typography variant="h2" sx={{ mb: 2, maxWidth: 900 }}>
        {post.title}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4, fontSize: "1rem" }}>
        Published {post.createdAt} • 8 min read
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
        <Typography sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}>
          This is where the full blog article content will be displayed.
        </Typography>

        <Typography sx={{ lineHeight: 1.9, fontSize: "1.05rem" }}>
          For now, this page is reading from mock data using the slug from the
          URL.
        </Typography>
      </Box>
    </Box>
  );
}