import { CircularProgress } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
//import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function CategoryBar({ currentCategoryId }) {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const response = await fetch(
        process.env.REACT_APP_API + "/api/categories",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      setCategories(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Box>
        <Paper elevation={2}>
          <h3>Categories</h3>
        </Paper>
      </Box>
      <Box sx={{ width: "100%", bgcolor: "background.paper", marginY: 2 }}>
        <nav aria-label="admin pages">
          <Divider />
          <List>
            {categories ? (
              categories.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton
                    selected={
                      currentCategoryId && currentCategoryId === category.id
                    }
                    component={RouterLink}
                    to={"/category/" + category.id}
                  >
                    <ListItemText primary={category.title} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <CircularProgress />
            )}
          </List>
          <Divider />
        </nav>
      </Box>
    </div>
  );
}
