//import { Link } from "react-router-dom";
import "./layout.css";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";

import { Link, useNavigate, useLocation } from "react-router-dom"; //use link for the button to go to other pages
import Signup from "../user/Signup.jsx";
import auth from "../lib/auth-helper";

const isActive = (location, path) => (location.pathname === path ? "#ff4081" : "#374151");

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <header>
        <div className="brand">
          <img src="/assets/logo.png" alt="Logo" />
          <h1>My Portfolio</h1>
          
          {!auth.isAuthenticated() && (
            <>
              <Link to="/signup">
                <Button
                  variant="text"
                  sx={{
                    color: isActive(location, "/signup"),
                    fontWeight: 500,
                    fontSize: "1.5rem",
                    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#add8e6",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  variant="text"
                  sx={{
                    color: isActive(location, "/signin"),
                    fontWeight: 500,
                    fontSize: "1.5rem",
                    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#add8e6",
                    },
                  }}
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}

          {auth.isAuthenticated() && (
          <>
            <Link to={`/user/${auth.isAuthenticated().user._id}`}>
              <Button
                sx={{
                  color: isActive(
                    location,
                    `/user/${auth.isAuthenticated().user._id}`
                  ),
                }}
              >
                My Profile
              </Button>
            </Link>
            <Button
              sx={{ color: "#ffffff" }}
              onClick={() => {
                auth.clearJWT(() => navigate("/"));
              }}
            >
              Sign out
            </Button>
          </>
        )}
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/project">Project</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}
