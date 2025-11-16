import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For edit button
import auth from "../lib/auth-helper.js";
import { list, remove } from "../user/api-contacts.js";

// Import MUI components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ContactList() {
  const [contactItems, setContactItems] = useState([]);

  const isAuthenticated = auth.isAuthenticated();
  //check user id logged in
  /* const loggedInUserId = isAuthenticated ? isAuthenticated.user._id : null;
  if (loggedInUserId) {
    console.log("Logged in user ID:", loggedInUserId);
  } */

  const isAdmin = isAuthenticated && isAuthenticated.user.role === "Admin"; //checks if logged in user is admin
  //   console.log(isAuthenticated.user.role);
  //   console.log(isAdmin);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // do read crud operation to get users from db
    list(signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setContactItems(data);
      }
    });

    return () => abortController.abort();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    // Use authCheck
    const jwt = auth.isAuthenticated();
    if (!jwt) return;

    try {
      await remove({ educationId: id }, { t: jwt.token });
      setContactItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, mb: 5 }}>
      <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
        Contacts
      </Typography>

      {contactItems.length === 0 ? (
        <Typography variant="body2">No contacts found.</Typography>
      ) : (
        <List>
          {contactItems.map((item, i) => (
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
                      to={`/contacts/${item._id}`}
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
                    {` — ${item.email || "No description"}`}
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
