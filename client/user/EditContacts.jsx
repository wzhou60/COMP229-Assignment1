import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon } from "@mui/material";
import auth from "../lib/auth-helper.js";
import { read, update } from "./api-contacts.js";
import { Navigate, useParams } from "react-router-dom";

export default function EditContacts() {
  const { userId } = useParams();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    open: false,
    error: "",
    NavigateToContact: false,
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId }, { t: jwt.token }, signal).then((data) => {
      if (data?.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        }));
      }
    });

    return () => abortController.abort();
  }, [userId]);

  const clickSubmit = () => {
    const user = {
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
    };

    update({ userId }, { t: jwt.token }, user).then((data) => {
      if (data?.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          userId: data._id,
          NavigateToContact: true,
        }));
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (values.NavigateToContact) {
    return <Navigate to={`/contact`} />;
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
