import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";

import { SiDotnet } from "react-icons/si";

import { LuShip, LuServer, LuCode } from "react-icons/lu";

import type { Blog } from "../../../models/blog";
import { formatDisplayDate } from "../../../utils/formatDisplayDate";
import { getEstimatedReadTime } from "../../../utils/getEstimatedReadTime";
import { routes } from "../../../router/routes";

type Props = {
  blog: Blog;
};

import { FaJava, FaReact } from "react-icons/fa";

import { SiTypescript, SiSpringboot, SiPostgresql } from "react-icons/si";
import { LuLayers } from "react-icons/lu";

function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();

  if (name.includes("react")) return <FaReact size={16} />;
  if (name.includes("typescript")) return <SiTypescript size={16} />;
  if (name.includes("spring")) return <SiSpringboot size={16} />;
  if (name.includes("java")) return <FaJava size={16} />;
  if (name.includes("csharp") || name.includes("c#"))
    return <SiDotnet size={16} />;
  if (name.includes("sql") || name.includes("postgres"))
    return <SiPostgresql size={16} />;
  if (name.includes("architecture")) return <LuLayers size={16} />;
  if (name.includes("backend")) return <LuServer size={16} />;
  if (name.includes("navis") || name.includes("n4"))
    return <LuShip size={16} />;

  return <LuCode size={16} />;
}

export default function BlogCard({ blog }: Props) {
  const { estimatedReadTime } = getEstimatedReadTime(blog.content);

  return (
    <Card
      component={Link}
      to={routes.blogDetails(blog.slug)}
      elevation={0}
      sx={{
        textDecoration: "none",
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
          borderColor: (muiTheme) =>
            alpha(muiTheme.palette.primary.main, 0.35),
          boxShadow: "0 14px 35px rgba(23, 32, 51, 0.08)",
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
            icon={getCategoryIcon(blog.categoryName)}
            label={blog.categoryName}
            size="small"
            sx={{
              "& .MuiChip-icon": {
                color: "primary.dark",
              },
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
          {formatDisplayDate(new Date(blog.createdAt))} / {estimatedReadTime}{" "}
          min read
        </Typography>
      </CardContent>
    </Card>
  );
}
