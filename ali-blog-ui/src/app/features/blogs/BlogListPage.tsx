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

      <Box sx={{ display: "grid", gap: 2.5 }}>
        {mockBlogPosts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            summary={post.summary}
            tag={post.tag}
            date={post.createdAt}
          />
        ))}
      </Box>
    </Box>
  );
}
