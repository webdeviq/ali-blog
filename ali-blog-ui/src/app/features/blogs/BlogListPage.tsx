import { Box, Typography } from "@mui/material";
import BlogCard from "./components/BlogCard";
import { mockBlogPosts } from "./mockBlogPosts";

export default function BlogListPage() {
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
        {mockBlogPosts.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </Box>
    </Box>
  );
}
