//
// This is a simple component that displays a welcome message on HOME Page
// It is used in MainRouter.jsx

//Your Home Page should include some sort of welcome message and link or button that
//allows the user to redirect your About Me Page and / or other pages. I recommend also
// including some sort of Mission Statement.

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"; //use link for the button to go to other pages
import "./home.css";
import Signup from "../user/Signup.jsx";
import Users from "../user/Users.jsx";

import Snackbar from "@mui/material/Snackbar"; // The "pop-up"
import Alert from "@mui/material/Alert"; // Makes it look nice
export default function Home() {
  return <Welcome />;
}

function Welcome() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // If we were navigated here with a message, show it
    if (location.state?.message) {
      setMessage(location.state.message);
      setOpen(true);
      // Clear the state from history so the message doesn't eappear if the user navigates back and forth
      window.history.replaceState({}, document.title);
    }
  }, [location]); // Run this effect when the location changes

  // Handles closing the snackbar (e.g., if user clicks away)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="welcomeMessage">
        <h2>Hello, My Name is Jackie</h2>
        <p>
          I am a student at Centennial College and I am currently in the 3rd semester of the
          Software Engineering Technology program.
        </p>
        <div className="missionStatement">
          <h3>Mission Statement</h3>
          <p>
            To continuously learn and improve my skills in software development, and to contribute
            to the tech community through innovative projects and collaboration.
          </p>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={3000} //  fade after 3 seconds
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      <Buttons />
      <div style={{ marginBottom: "40px" }}>
        <Users />
      </div>
    </>
  );
}

//button to about me page
function Buttons() {
  return (
    <>
      <Link to="/about">
        <button className="home-aboutButton">About Me</button>
      </Link>
    </>
  );
}
