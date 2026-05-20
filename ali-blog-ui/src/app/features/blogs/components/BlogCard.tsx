import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import type { Blog } from "../../../models/blog";
import { formatDisplayDate } from "../../../utils/formatDisplayDate";
import { getEstimatedReadTime } from "../../../utils/getEstimatedReadTime";
import { routes } from "../../../router/routes";

type Props = {
  blog: Blog;
};

export default function BlogCard({ blog }: Props) {
  const { estimatedReadTime } = getEstimatedReadTime(blog.content);

  return (
    <Card
      component={Link}
      to={routes.blogDetails(blog.slug)}
      elevation={0}
      sx={{
        textDecoration: "none",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        transition: "all 0.2s ease",
        height: "100%",

        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: "primary.main",
        },

        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(255,95,25,0.35)",
          boxShadow: "0 14px 35px rgba(15,23,42,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Chip
            label={blog.categoryName}
            size="small"
            sx={{
              bgcolor: "rgba(255,95,25,0.08)",
              color: "primary.dark",
              fontWeight: 700,
            }}
          />

          <ArrowOutwardIcon
            sx={{
              fontSize: 18,
              color: "text.secondary",
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {blog.title}
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {blog.excerpt}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {formatDisplayDate(new Date(blog.createdAt))} • {estimatedReadTime}{" "}
          min read
        </Typography>
      </CardContent>
    </Card>
  );
}
