import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();

  // Check if the user is authenticated using the auth helper.
  return auth.isAuthenticated() ? (
    // If authenticated, render the child components.
    children
  ) : (
    // If not authenticated, redirect the user to the /signin page.
    // The current location is passed in the state so that the user can be redirected back to the original page after signing in.
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
