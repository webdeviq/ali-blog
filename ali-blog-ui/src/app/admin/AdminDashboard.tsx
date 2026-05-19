import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import { mockBlogPosts } from "../features/blogs/mockBlogPosts";
import { routes } from "../router/routes";
export default function AdminDashboard() {
  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Admin Dashboard
          </Typography>

          <Typography color="text.secondary">
            Manage blog posts, drafts, and published articles.
          </Typography>
        </Box>

        <Button
          component={Link}
          to={routes.createPost}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Post
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        {mockBlogPosts.map((post) => (
          <Box
            key={post.id}
            sx={{
              p: 2.5,
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 2,
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "divider",
              "&:last-child": {
                borderBottom: 0,
              },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{post.title}</Typography>

              <Typography variant="body2" color="text.secondary">
                /blogs/{post.slug}
              </Typography>
            </Box>

            <Chip
              label="Draft"
              size="small"
              sx={{
                bgcolor: "rgba(255,95,25,0.08)",
                color: "primary.dark",
                fontWeight: 700,
              }}
            />

            <Box>
              <IconButton component={Link} to={routes.editPost(post.slug)}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
