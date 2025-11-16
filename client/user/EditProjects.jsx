import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from "@mui/material";
import auth from "../lib/auth-helper.js";
import { read, update } from "./api-projects.js";
import { Navigate, useParams } from "react-router-dom";

export default function EditProjects() {
  const { userId } = useParams();
  const [values, setValues] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
    open: false,
    error: "",
    NavigateToProject: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data?.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
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
  }, [userId]);

  const clickSubmit = () => {
    const user = {
      title: values.title || undefined,
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
      completion: values.completion || undefined,
      description: values.description || undefined,
    };

    update({ userId }, { t: jwt.token }, user).then((data) => {
      if (data?.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          userId: data._id,
          NavigateToProject: true,
        }));
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.NavigateToProfile) {
    return <Navigate to={`/projects/${values.userId}`} />;
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
          Edit Profile
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
          label="firstName"
          value={values.firstname}
          onChange={handleChange("firstname")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />
        <br />
        <TextField
          id="lastname"
          type="lastname"
          label="lastName"
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
          InputLabelProps={{ shrink: true }}
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
