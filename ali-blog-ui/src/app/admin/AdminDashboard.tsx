import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import agent from "../api/agent";
import type { Blog } from "../models/blog";
import { routes } from "../router/routes";
import { useNotification } from "../notifications/useNotification";
import type { SubscriberResponse } from "../models/subscriberResponse";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [postToDelete, setPostToDelete] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingPostSlug, setUpdatingPostSlug] = useState("");
  const [subscribers, setSubscribers] = useState<SubscriberResponse[]>([]);

  const { showNotification } = useNotification();

  useEffect(() => {
    Promise.all([agent.AdminPosts.list(), agent.Newsletter.subscribers()])
      .then(([postsResponse, subscribersResponse]) => {
        setPosts(postsResponse.content);
        setSubscribers(subscribersResponse);
      })
      .catch(() =>
        setError(
          "An error occurred loading the admin dashboard. Please try again later.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleTogglePublish = async (post: Blog) => {
    setUpdatingPostSlug(post.slug);

    try {
      const updatedPost = post.published
        ? await agent.AdminPosts.unpublish(post.slug)
        : await agent.AdminPosts.publish(post.slug);

      setPosts((prev) =>
        prev.map((currentPost) =>
          currentPost.slug === post.slug ? updatedPost : currentPost,
        ),
      );

      showNotification(
        post.published
          ? "Post unpublished successfully"
          : "Post published successfully",
        "success",
      );
    } catch {
      showNotification("Failed to update post status", "error");
    } finally {
      setUpdatingPostSlug("");
    }
  };

  const handleOpenDeleteDialog = (post: Blog) => {
    setPostToDelete(post);
  };

  const handleCloseDeleteDialog = () => {
    if (deleting) return;
    setPostToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    setDeleting(true);

    try {
      await agent.AdminPosts.delete(postToDelete.slug);

      setPosts((prev) =>
        prev.filter((post) => post.slug !== postToDelete.slug),
      );

      showNotification("Post deleted successfully", "success");
      setPostToDelete(null);
    } catch {
      showNotification("Failed to delete post", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

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

      {error ? (
        <Typography color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : posts.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography color="text.secondary">
            No posts found. Create your first post to get started.
          </Typography>
        </Paper>
      ) : (
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

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={updatingPostSlug === post.slug}
                  onClick={() => handleTogglePublish(post)}
                >
                  {post.published ? "Unpublish" : "Publish"}
                </Button>

                <IconButton component={Link} to={routes.editPost(post.slug)}>
                  <EditOutlinedIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleOpenDeleteDialog(post)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Paper>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Newsletter Subscribers
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          {subscribers.length === 0 ? (
            <Box sx={{ p: 3 }}>
              <Typography color="text.secondary">
                No newsletter subscribers yet.
              </Typography>
            </Box>
          ) : (
            subscribers.map((subscriber) => (
              <Box
                key={subscriber.id}
                sx={{
                  p: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": {
                    borderBottom: 0,
                  },
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  {subscriber.email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          )}
        </Paper>
      </Box>

      <Dialog open={Boolean(postToDelete)} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete post?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{postToDelete?.title}"? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={deleting}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
