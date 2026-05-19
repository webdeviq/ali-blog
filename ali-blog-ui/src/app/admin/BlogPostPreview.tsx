import { Paper, Typography } from "@mui/material";
import { formatDisplayDate } from "../utils/formatDisplayDate";

import { getEstimatedReadTime } from "../utils/getEstimatedReadTime";

import type { BlogPostFormValues } from "./blogPostFormValues";

type Props = {
  formValues: BlogPostFormValues;
};

export default function BlogPostPreview({ formValues }: Props) {
  const { estimatedReadTime } = getEstimatedReadTime(formValues.content);
  const previewDate = formatDisplayDate(new Date());

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="overline" color="text.secondary">
        Preview
      </Typography>

      <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
        {formValues.title || "Post title preview"}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {formValues.tag || "Tag"} • {estimatedReadTime} min read • {previewDate}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {formValues.summary || "Post summary preview..."}
      </Typography>

      <Typography sx={{ lineHeight: 1.8, whiteSpace: "pre-line" }}>
        {formValues.content || "Post content preview..."}
      </Typography>
    </Paper>
  );
}
