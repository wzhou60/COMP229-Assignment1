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
import EditContacts from "./user/EditContacts.jsx";
import EditEducation from "./user/EditEducation.jsx";
import EditProjects from "./user/EditProjects.jsx";
import AddProjects from "./user/AddProject.jsx";
import AddEducation from "./user/AddEducation.jsx";

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

        <Route
          path="/contacts/:userId"
          element={
            <PrivateRoute>
              <EditContacts />
            </PrivateRoute>
          }
        />

        <Route
          path="/qualifications/:userId"
          element={
            <PrivateRoute>
              <EditEducation />
            </PrivateRoute>
          }
        />

        <Route
          path="/add/qualifications/"
          element={
            <PrivateRoute>
              <AddEducation />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects/:userId"
          element={
            <PrivateRoute>
              <EditProjects />
            </PrivateRoute>
          }
        />

        <Route
          path="/add/projects/"
          element={
            <PrivateRoute>
              <AddProjects />
            </PrivateRoute>
          }
        />

        {""}
      </Routes>
    </div>
  );
};
export default MainRouter;
