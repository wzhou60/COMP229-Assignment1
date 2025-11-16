import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For edit button
import auth from "../lib/auth-helper.js"; // For checking roles

import { authCheck } from "../user/api-user.js";
import { list, remove } from "../user/api-edu.js";

// Import MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function EducationList() {
  const [educationItems, setEducationItems] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  const isAuthenticated = authCheck.isAuthenticated();
  const isAdmin = isAuthenticated && isAuthenticated.user.role === "admin";

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setEducationItems(data);
      }
    });

    return () => abortController.abort();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    // Use authCheck
    const jwt = authCheck.isAuthenticated();
    if (!jwt) return;

    try {
      await remove({ educationId: id }, { t: jwt.token });
      setEducationItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  /*   if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    ); */
  console.log("Edu itms :", educationItems);
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Education & Qualifications
      </Typography>

      {educationItems.length === 0 ? (
        <Typography variant="body2">No education items found.</Typography>
      ) : (
        <List>
          {educationItems.map((item, i) => (
            <ListItem
              key={item._id}
              divider // Adds a line between items
              secondaryAction={
                isAdmin && (
                  <Box>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      component={Link}
                      to={`/qualifications/${item._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(item._id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )
              }
            >
              <ListItemText
                primary={item.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {item.firstname} {item.lastname}
                    </Typography>
                    {` — ${item.description || "No description"}`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
