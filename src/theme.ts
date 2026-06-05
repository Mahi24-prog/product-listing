"use client";
import { createTheme, ThemeOptions } from "@mui/material/styles";

const baseOptions: ThemeOptions = {
  typography: {
    fontFamily: "inherit",
    h1: { fontWeight: 700, fontSize: "2rem" },
    h2: { fontWeight: 600, fontSize: "1.75rem" },
    h3: { fontWeight: 600, fontSize: "1.25rem" },
    h4: { fontWeight: 600, fontSize: "1.125rem" },
    h5: { fontWeight: 500, fontSize: "1rem" },
    h6: { fontWeight: 500, fontSize: "0.875rem" },
    body1: { fontSize: "0.9rem" },
    body2: { fontSize: "0.8rem" },
    button: { fontSize: "0.85rem" },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
  },
});

export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
  },
});
