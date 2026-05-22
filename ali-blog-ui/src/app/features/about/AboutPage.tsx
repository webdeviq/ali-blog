import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(circle at top right, rgba(255,95,25,0.12), transparent 35%), #fff",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          About FullStackIQ
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ fontSize: 18, lineHeight: 1.8 }}
        >
          FullStackIQ is my personal developer journal — a place where I write
          about the things I am learning, building, debugging, and improving as
          a software developer.
        </Typography>
      </Paper>

      <Box sx={{ mt: 4, display: "grid", gap: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            Why I Built This App
          </Typography>

          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            I built this blog to document my real journey as a developer. Not
            just polished tutorials, but the actual process: learning Java,
            building with Spring Boot, working with React and TypeScript,
            solving backend problems, improving UI decisions, and taking small
            projects all the way to production.
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            What I Write About
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap sx={{ mb: 2 }}>
            {[
              "Java",
              "Spring Boot",
              "React",
              "TypeScript",
              "C#",
              ".NET",
              "SQL",
              "Architecture",
            ].map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>

          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            The posts here focus on practical software engineering: backend
            APIs, frontend architecture, production lessons, clean code,
            debugging, database work, and the mindset needed to keep improving.
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            The Goal
          </Typography>

          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            The goal of FullStackIQ is simple: keep learning, keep building, and
            share the lessons along the way. Every post is part of that journey.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
