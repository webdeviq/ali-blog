import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import type { Category } from "../models/category";

import BlogPostPreview from "./BlogPostPreview";
import { useEffect, useState } from "react";

import {
  FormControlLabel,
  Switch,
  Chip,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import type { BlogPostFormValues } from "./blogPostFormValues";

import { getEstimatedReadTime } from "../utils/getEstimatedReadTime";
import { routes } from "../router/routes";
import agent from "../api/agent";
import { useNotification } from "../notifications/useNotification";

export default function BlogEditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { showNotification } = useNotification();

  const isEditMode = Boolean(slug);
  const [loading, setLoading] = useState(true);

  const [formValues, setFormValues] = useState<BlogPostFormValues>({
    title: "",
    excerpt: "",
    categorySlug: "",
    content: "",
    isPublished: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadEditorData = async () => {
      try {
        const categoriesResponse = await agent.Categories.list();
        setCategories(categoriesResponse);

        if (isEditMode && slug) {
          const post = await agent.AdminPosts.details(slug);

          setFormValues({
            title: post.title,
            excerpt: post.excerpt,
            categorySlug: post.categorySlug,
            content: post.content,
            isPublished: post.published,
          });
        }
      } catch {
        showNotification("Failed to load editor data", "error");
      } finally {
        setLoading(false);
      }
    };

    loadEditorData();
  }, [isEditMode, slug, showNotification]);
  if (loading) {
    return <CircularProgress />;
  }

  const handleChange =
    (field: keyof BlogPostFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const isFormValid =
    formValues.title.trim() &&
    formValues.excerpt.trim() &&
    formValues.categorySlug.trim() &&
    formValues.content.trim();

  const handleSaveDraft = async () => {
    if (!isFormValid) return;

    try {
      const savedPost =
        isEditMode && slug
          ? await agent.AdminPosts.update(slug, formValues)
          : await agent.AdminPosts.create(formValues);

      if (savedPost.published) {
        await agent.AdminPosts.unpublish(savedPost.slug);
      }

      showNotification(
        isEditMode
          ? "Draft updated successfully"
          : "Draft created successfully",
        "success",
      );

      navigate(routes.admin);
    } catch {
      showNotification("Failed to save draft", "error");
    }
  };

  const handlePublish = async () => {
    if (!isFormValid) return;

    try {
      const savedPost =
        isEditMode && slug
          ? await agent.AdminPosts.update(slug, formValues)
          : await agent.AdminPosts.create(formValues);

      await agent.AdminPosts.publish(savedPost.slug);

      showNotification(
        isEditMode
          ? "Post updated and published successfully"
          : "Post published successfully",
        "success",
      );

      navigate(routes.admin);
    } catch {
      showNotification("Failed to publish post", "error");
    }
  };

  const { wordCount, estimatedReadTime } = getEstimatedReadTime(
    formValues.content,
  );

  return (
    <Box>
      <Button
        component={Link}
        to={routes.admin}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Admin
      </Button>

      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(circle at top left, rgba(255,95,25,0.10), transparent 35%), #fff",
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          {isEditMode ? "Edit Post" : "Create Post"}
        </Typography>

        <Typography color="text.secondary">
          {isEditMode
            ? "Update this blog post before publishing your changes."
            : "Create a new post for your personal developer journal."}
        </Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Chip
            label={isEditMode ? "Editing" : "New Post"}
            sx={{
              bgcolor: "rgba(255,95,25,0.08)",
              color: "primary.dark",
              fontWeight: 700,
            }}
          />

          <Chip
            label={formValues.isPublished ? "Published" : "Draft"}
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: "grid", gap: 2.5 }}>
          <Typography variant="h6">Post Details</Typography>
          <TextField
            label="Title"
            value={formValues.title}
            onChange={handleChange("title")}
            fullWidth
            helperText="The slug is generated automatically from the title."
          />

          <TextField
            label="Excerpt"
            value={formValues.excerpt}
            onChange={handleChange("excerpt")}
            fullWidth
            multiline
            minRows={3}
            helperText={`${formValues.excerpt.length}/300 characters recommended`}
          />
          <TextField
            select
            label="Category"
            value={formValues.categorySlug}
            onChange={handleChange("categorySlug")}
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category.slug} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="h6">Content</Typography>
          <TextField
            label="Content"
            fullWidth
            value={formValues.content}
            onChange={handleChange("content")}
            multiline
            minRows={12}
            helperText={`${wordCount} words • Estimated ${estimatedReadTime} min read`}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formValues.isPublished}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      isPublished: event.target.checked,
                    }))
                  }
                />
              }
              label={formValues.isPublished ? "Published" : "Draft"}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to={routes.admin}
                variant="text"
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>

              <Button
                variant="outlined"
                startIcon={<SaveOutlinedIcon />}
                onClick={handleSaveDraft}
                disabled={!isFormValid}
              >
                Save Draft
              </Button>

              <Button
                variant="contained"
                startIcon={<SendOutlinedIcon />}
                onClick={handlePublish}
                disabled={!isFormValid}
              >
                Publish
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      <BlogPostPreview formValues={formValues} />
    </Box>
  );
}
