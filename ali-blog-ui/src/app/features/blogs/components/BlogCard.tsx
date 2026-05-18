import { Chip, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  date: string;
};

export default function BlogCard({
  slug,
  title,
  summary,
  tag,
  date,
}: Props) {
  return (
    <Paper
      component={Link}
      to={`/blogs/${slug}`}
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
        },
      }}
    >
      <Chip
        label={tag}
        size="small"
        sx={{
          mb: 2,
          bgcolor: "rgba(255,95,25,0.08)",
          color: "primary.dark",
          fontWeight: 700,
        }}
      />

      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          lineHeight: 1.7,
          mb: 1,
        }}
      >
        {summary}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {date}
      </Typography>
    </Paper>
  );
}