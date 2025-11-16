import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import auth from "../lib/auth-helper.js";
import { create } from "./api-projects.js";

export default function AddProject() {
  // Match the ProjectSchema
  const [values, setValues] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
    error: "",
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/about");
  };

  const clickSubmit = async () => {
    const project = {
      title: values.title || undefined,
      firstname: values.firstname || undefined,
      lastname: values.lastname || undefined,
      email: values.email || undefined,
      completion: values.completion || undefined,
      description: values.description || undefined,
    };

    create(project).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          mt: 3,
          p: 2,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: 18, mb: 2 }}>
            Add New Project
          </Typography>

          <TextField
            id="title"
            label="Title"
            placeholder="e.g., Restaurant App"
            sx={{ width: "100%", mb: 2 }}
            value={values.title}
            onChange={handleChange("title")}
            margin="normal"
            required
          />

          <TextField
            id="firstname"
            label="First Name"
            sx={{ width: "100%", mb: 2 }}
            value={values.firstname}
            onChange={handleChange("firstname")}
            margin="normal"
            required
          />

          <TextField
            id="lastname"
            label="Last Name"
            sx={{ width: "100%", mb: 2 }}
            value={values.lastname}
            onChange={handleChange("lastname")}
            margin="normal"
            required
          />

          <TextField
            id="email"
            label="Email Address"
            type="email"
            placeholder="email@example.com"
            sx={{ width: "100%", mb: 2 }}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            required
          />

          <TextField
            id="completion"
            label="Completion Date"
            type="date"
            sx={{ width: "100%", mb: 2 }}
            value={values.completion}
            onChange={handleChange("completion")}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="description"
            label="Description"
            placeholder="Optional: A brief description"
            sx={{ width: "100%", mb: 2 }}
            value={values.description}
            onChange={handleChange("description")}
            margin="normal"
            multiline
            rows={4}
          />

          {values.error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            sx={{ margin: "0 auto", mb: 2 }}
          >
            Add Project
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Project Added</DialogTitle>
        <DialogContent>
          <DialogContentText>Project record successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" autoFocus variant="contained" onClick={handleClose}>
            View Project List
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
