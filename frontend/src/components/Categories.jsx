import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const response = await fetch("http://localhost:8000/api/categories", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);
        return;
      }
      setCategories(responseBody.categories);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="Categories">
      <Box>
        <Paper elevation={2}>
          <h2>Product Categories</h2>
        </Paper>
      </Box>
      <Box
        className="Categories__Box"
        sx={{
          margin: "20px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Grid container direction="row" spacing={2}>
          {categories ? (
            categories.map((category) => (
              <Grid item key={category.id} xs={12} md={6}>
                <Card>
                  <Paper elevation={3}>
                    <CardActionArea
                      component={RouterLink}
                      to={"/category/" + category.id}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image="/images/placeholder.png"
                        alt={category.title}
                      />
                      <CardContent sx={{ minHeight: 160 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Paper>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} md={12}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
}
