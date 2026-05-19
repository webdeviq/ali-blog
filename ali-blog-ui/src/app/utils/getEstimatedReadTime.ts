export const getEstimatedReadTime = (content: string) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    wordCount,
    estimatedReadTime: Math.max(1, Math.ceil(wordCount / 200)),
  };
};
