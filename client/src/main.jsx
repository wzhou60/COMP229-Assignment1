import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 *
 * Write a note to look at assingment 2 for the first part of the assignment.
 * 
 * PARTII – Reference Slides – Week8, Week9, Week10 slides.
a) Create the forms, SignUp, Signin, Education or Qualification, Project using react form ensuring state management. (Frontend).
b) Update the Contact form using react form ensuring state management.
c) Integrate the Backend APIs to the Frontend (API consumption).
d) Create and Perform CRUD Operations for the objects Contact, Education or Qualification e.t.c
e) Authentication and user roles. User and Admin role. The Admin should be able to perform the CRUD
operation for each object while the user are only able to view/read.
f) Hardcode the Admin role credentials in your MongoDB database other users can signup and signin
using the credentials created on signup.



PARTIII – Reference Slides – Week6, Week8, Week9, Week10 slides.
a) Ensure you have a functioning Full Stack Portfolio Application. All entries from the Frontend are
saved or stored in the database, seamless connection and communication with Frontend and
Backend.
b) Ensure your application is error free.
c) Push/update your code in GitHub
 */
