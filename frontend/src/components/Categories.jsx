import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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
      <div>
        <h2>Categories</h2>
      </div>
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
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {categories ? (
            categories.map((category) => (
              <Grid item key={category.id} xs={12} md={6}>
                <Card sx={{ maxWidth: 800, minHeight: 320 }}>
                  <CardActionArea
                    component={RouterLink}
                    to={"/category/" + category.id}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={
                        category.photo
                          ? category.photo
                          : "https://via.placeholder.com/150x600.png"
                      }
                      alt={category.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Box>
    </div>
  );
}
