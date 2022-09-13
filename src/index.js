import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ParallaxProvider } from "react-scroll-parallax";

import { createTheme, ThemeProvider } from "@mui/material";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#ebdcb7",
    },
    secondary: {
      main: "#556a41",
    },
    text: {
      primary: "#372f0b",
      secondary: "rgba(55,47,11,0.8)",
      disabled: "rgba(55,47,11,0.6)",
      hint: "rgba(55,47,11,0.6)",
    },
  },
  typography: {
    h1: {
      fontFamily: '"Barlow Condensed", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: "Open Sans",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "Open Sans",
    },
    body1: {
      fontFamily: "Open Sans",
    },
    button: {
      fontFamily: "Open Sans",
    },
    fontFamily: "Open Sans",
  },
};

let theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ParallaxProvider>
      <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </ParallaxProvider>
  </React.StrictMode>
);
