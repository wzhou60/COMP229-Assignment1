import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // For edit button
import auth from "../lib/auth-helper.js"; // For checking roles
import { list, remove } from "../user/api-projects.js";

export default function ProjectList() {
  const [projectItems, setProjectItems] = useState([]);

  const isAuthenticated = auth.isAuthenticated();
  const isAdmin = isAuthenticated && isAuthenticated.user.role === "Admin";

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setProjectItems(data);
      }
    });

    return () => abortController.abort();
  }, []);

  const handleDelete = async (id, jwt) => {
    console.log(id);
    if (!window.confirm("Are you sure?")) return;

    remove({ userId: id }, { t: jwt.token }).then((data) => {
      if (data?.error) {
        console.error(data.error);
      } else {
        console.log("deleted");
        setProjectItems((prev) => prev.filter((item) => item._id !== id)); //refreshes list after delete with out the deleted item based on id
      }
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Box
        sx={{
          mb: 2,
          position: "relative", // Enables absolute positioning for the icon
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Projects
        </Typography>
        {isAdmin && (
          <IconButton
            color="primary"
            aria-label="add project"
            component={Link}
            to="/add/projects/"
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>
      {projectItems.length === 0 ? (
        <Typography variant="body2">No project items found.</Typography>
      ) : (
        <List>
          {projectItems.map((item, i) => (
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
                      to={`/projects/${item._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(item._id, isAuthenticated)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )
              }
            >
              <ListItemText /*  */
                primary={item.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {item.firstname} {item.lastname}
                    </Typography>
                    {` — ${item.description || "No description"}`}
                    {` — Completed:  ${item.completion.split("T")[0] || "No completion date"}`}
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
