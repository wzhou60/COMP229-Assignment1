import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Updated import for MUI v5
import CssBaseline from "@mui/material/CssBaseline"; // Optional: resets browser styling
import MainRouter from "../MainRouter";
import MainTheme from "../theme";

const App = () => {
  return (
    <Router>
      {/* <ThemeProvider theme={MainTheme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider> */}
      <MainRouter />
    </Router>
  );
};

export default App;
