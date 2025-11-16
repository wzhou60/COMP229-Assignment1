import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./src/about";
import Contact from "./src/contact";
import Services from "./src/service";
import Project from "./src/project";
import Layout from "./components/Layout";
import Signup from "./user/Signup.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";

const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/project" element={<Project />} />
        <Route exact path="/contact" element={<Contact />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
