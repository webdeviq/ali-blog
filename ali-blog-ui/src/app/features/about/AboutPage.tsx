import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

const skills = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "C#",
  ".NET",
  "SQL",
  "Architecture",
];

export default function AboutPage() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 0 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid",
            borderColor: "divider",
            background:
              "radial-gradient(circle at top right, rgba(255, 95, 25, 0.14), transparent 38%), linear-gradient(180deg, #fff 0%, #fff7f3 100%)",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 800,
              letterSpacing: -1,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Who Am I?
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: 16, md: 18 },
              lineHeight: { xs: 1.7, md: 1.8 },
              maxWidth: 900,
            }}
          >
            My name is Ali, and I'm a full-stack web developer who loves
            building real software and understanding how things work under the
            hood. I enjoy working across the stack, from designing clean user
            interfaces with React and TypeScript to building backend APIs with
            C#, .NET, Java, and Spring Boot.
            <br />
            <br />
            What drives me most is the process of learning, debugging,
            improving, and turning ideas into working applications. FullStackIQ
            is where I document that journey — the lessons, mistakes,
            breakthroughs, and practical experience I gain while becoming a
            stronger software engineer.
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 3, md: 4 },
            border: "1px solid",
            borderColor: "divider",
            background:
              "radial-gradient(circle at top left, rgba(255, 95, 25, 0.12), transparent 35%), #fff",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 800,
              letterSpacing: -1,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            About FullStackIQ
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: 16, md: 18 },
              lineHeight: { xs: 1.7, md: 1.8 },
              maxWidth: 850,
            }}
          >
            FullStackIQ is my personal developer journal — a place where I write
            about the things I am learning, building, debugging, and improving
            as a software developer.
          </Typography>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 3 },
            minWidth: 0,
          }}
        >
          <InfoCard title="Why I Built This App">
            I built this blog to document my real journey as a developer. Not
            just polished tutorials, but the actual process: learning Java,
            building with Spring Boot, working with React and TypeScript,
            solving backend problems, improving UI decisions, and taking small
            projects all the way to production.
          </InfoCard>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: { xs: 3, md: 4 },
              border: "1px solid",
              borderColor: "divider",
              minWidth: 0,
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: { md: "translateY(-4px)" },
                boxShadow: { md: "0 18px 45px rgba(15, 23, 42, 0.08)" },
              },
            }}
          >
            <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 800 }}>
              What I Write About
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                mb: 2,
                flexWrap: "wrap",
                minWidth: 0,
              }}
            >
              {skills.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "rgba(255, 95, 25, 0.08)",
                    color: "primary.main",
                  }}
                />
              ))}
            </Stack>


            <Typography
              color="text.secondary"
              sx={{ lineHeight: 1.8, fontSize: { xs: 15.5, md: 16 } }}
            >
              The posts here focus on practical software engineering: backend
              APIs, frontend architecture, production lessons, clean code,
              debugging, database work, and the mindset needed to keep
              improving.
            </Typography>
          </Paper>

          <InfoCard title="The Goal">
            The goal of FullStackIQ is simple: keep learning, keep building, and
            share the lessons along the way. Every post is part of that journey.
          </InfoCard>
        </Box>
      </Stack>
    </Box>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: { xs: 3, md: 4 },
        border: "1px solid",
        borderColor: "divider",
        minWidth: 0,
        background: "#fff",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: { md: "translateY(-4px)" },
          boxShadow: { md: "0 18px 45px rgba(15, 23, 42, 0.08)" },
        },
      }}
    >
      <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 800 }}>
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ lineHeight: 1.8, fontSize: { xs: 15.5, md: 16 } }}
      >
        {children}
      </Typography>
    </Paper>
  );
}