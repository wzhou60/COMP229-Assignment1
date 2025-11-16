import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from "@mui/material";
import auth from "../lib/auth-helper.js";
import { read, update } from "./api-edu.js";
import { Navigate, useParams } from "react-router-dom";

export default function EditEducation() {
  const { userId } = useParams();
  const [values, setValues] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "", // Use string for date input
    description: "",
    open: false,
    error: "",
    NavigateToEducation: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data?.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        // Format the date for the date input field (YYYY-MM-DD)
        const completionDate = data.completion
          ? new Date(data.completion).toISOString().split("T")[0]
          : "";

        setValues((prev) => ({
          ...prev,
          title: data.title,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          completion: completionDate,
          description: data.description,
        }));
      }
    });

    return () => abortController.abort();
  }, [userId]); // Depend on educationId

  const clickSubmit = () => {
    const education = {
      title: values.title || undefined,
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
      completion: values.completion || undefined,
      description: values.description || undefined,
    };

    update({ userId }, { t: jwt.token }, education).then((data) => {
      if (data?.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          NavigateToEducation: true,
        }));
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.NavigateToEducation) {
    return <Navigate to={`/about/`} />; // Navigate to list page
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        textAlign: "center",
        pb: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
          Edit Education
        </Typography>
        <TextField
          id="title"
          label="Title"
          value={values.title}
          onChange={handleChange("title")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />
        <br />
        <TextField
          id="firstname"
          label="First Name"
          value={values.firstname}
          onChange={handleChange("firstname")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />
        <br />
        <TextField
          id="lastname"
          label="Last Name"
          value={values.lastname}
          onChange={handleChange("lastname")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />
        <br />
        <TextField
          id="completion"
          type="date"
          label="Completion Date"
          value={values.completion}
          onChange={handleChange("completion")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
          InputLabelProps={{ shrink: true }} // Keeps label from overlapping
        />
        <br />
        <TextField
          id="description"
          label="Description"
          value={values.description}
          onChange={handleChange("description")}
          margin="normal"
          multiline
          rows={4}
          sx={{ mx: 1, width: 300 }}
        />
        <br />
        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 1 }}>
            <Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button color="primary" variant="contained" onClick={clickSubmit} sx={{ mb: 2 }}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
