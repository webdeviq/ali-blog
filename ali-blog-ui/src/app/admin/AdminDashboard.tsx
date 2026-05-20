import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import agent from "../api/agent";
import type { Blog } from "../models/blog";
import { routes } from "../router/routes";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.AdminPosts.list()
      .then((response) => setPosts(response.content))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleDelete = async (slug: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post? ",
    );
    if (!confirmed) return;

    await agent.AdminPosts.delete(slug);
    setPosts((prev) => prev.filter((post) => post.slug !== slug));
  };

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
        {posts.map((post) => (
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
              label={post.published ? "Published" : "Draft"}
              size="small"
              sx={{
                bgcolor: post.published
                  ? "rgba(46,125,50,0.10)"
                  : "rgba(255,95,25,0.08)",
                color: post.published ? "success.main" : "primary.dark",
                fontWeight: 700,
              }}
            />

            <Box>
              <IconButton component={Link} to={routes.editPost(post.slug)}>
                <EditOutlinedIcon />
              </IconButton>

              <IconButton color="error" onClick={() => handleDelete(post.slug)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
