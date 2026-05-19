import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { tagOptions } from "../features/blogs/tagOptions";
import { createSlug } from "../utils/createSlug";
import BlogPostPreview from "./BlogPostPreview";

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
} from "@mui/material";
import { Navigate, useParams, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import type { BlogPostFormValues } from "./blogPostFormValues";

import { mockBlogPosts } from "../features/blogs/mockBlogPosts";
import { getEstimatedReadTime } from "../utils/getEstimatedReadTime";
import { routes } from "../router/routes";

export default function BlogEditorPage() {
  const { slug } = useParams();

  const post = mockBlogPosts.find((blog) => blog.slug === slug);
  const isEditMode = Boolean(slug);

  const [formValues, setFormValues] = useState<BlogPostFormValues>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    summary: post?.summary ?? "",
    tag: post?.tag ?? "",
    content: post?.content ?? "",
    isPublished: false,
  });

  const handleChange =
    (field: keyof BlogPostFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setFormValues((prev) => ({
      ...prev,
      title,
      slug: isEditMode ? prev.slug : createSlug(title),
    }));
  };

  if (isEditMode && !post) {
    return <Navigate to={routes.admin} replace />;
  }

  const isFormValid =
    formValues.title.trim() &&
    formValues.slug.trim() &&
    formValues.summary.trim() &&
    formValues.tag.trim() &&
    formValues.content.trim();

  const handleSaveDraft = () => {
    setFormValues((prev) => ({
      ...prev,
      isPublished: false,
    }));

    console.log("Saving Draft", {
      ...formValues,
      isPublished: false,
    });
  };

  const handlePublish = () => {
    setFormValues((prev) => ({
      ...prev,
      isPublished: true,
    }));

    console.log("Publishing post", {
      ...formValues,
      isPublished: true,
    });
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
            onChange={handleTitleChange}
            fullWidth
            helperText={
              !isEditMode
                ? "The slug is generated automatically from the title."
                : ""
            }
          />
          <TextField
            label="Slug"
            value={formValues.slug}
            onChange={handleChange("slug")}
            fullWidth
            helperText="This will be used in the blog post URL."
          />
          <TextField
            label="Summary"
            value={formValues.summary}
            onChange={handleChange("summary")}
            fullWidth
            multiline
            minRows={3}
            helperText={`${formValues.summary.length}/250 characters recommended`}
          />
          <TextField
            select
            label="Tag"
            value={formValues.tag}
            onChange={handleChange("tag")}
            fullWidth
          >
            {tagOptions.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
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
