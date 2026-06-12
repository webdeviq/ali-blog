import { alpha, createTheme } from "@mui/material/styles";

const brand = {
  orange: "#F97316",
  orangeDark: "#C2410C",
  orangeSoft: "#FFF3EA",
  ink: "#172033",
  muted: "#667085",
  cyan: "#0E7490",
  page: "#FAFAF7",
  paper: "#FFFFFF",
  line: "#E7E5E0",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brand.orange,
      dark: brand.orangeDark,
      light: brand.orangeSoft,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: brand.cyan,
      contrastText: "#FFFFFF",
    },
    background: {
      default: brand.page,
      paper: brand.paper,
    },
    divider: brand.line,
    text: {
      primary: brand.ink,
      secondary: brand.muted,
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1.08,
    },
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
      lineHeight: 1.12,
    },
    h4: {
      fontWeight: 750,
    },
    h5: {
      fontWeight: 750,
    },
    h6: {
      fontWeight: 650,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(180deg, #FAFAF7 0%, #F6F5F0 100%)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#FFFFFF", 0.84),
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${brand.line}`,
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
        },
        contained: {
          boxShadow: `0 10px 24px ${alpha(brand.orange, 0.24)}`,
          "&:hover": {
            boxShadow: `0 14px 30px ${alpha(brand.orange, 0.28)}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderColor: brand.line,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: `1px solid ${brand.line}`,
          boxShadow: "0 16px 40px rgba(23, 32, 51, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
        filled: {
          backgroundColor: brand.orangeSoft,
          color: brand.orangeDark,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});
