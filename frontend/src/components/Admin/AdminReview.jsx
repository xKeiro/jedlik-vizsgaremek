import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
//import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function AdminReview() {
  const { id } = useParams();

  const [review, setReview] = useState(null);

  useEffect(() => {
    async function getReview() {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(
          process.env.REACT_APP_API + `/api/reviews/${id}`,
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
        setReview(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    getReview();
  }, [id]);

  return (
    <div className="AdminReview">
      <Box>
        <Paper elevation={2}>
          <h3>Review</h3>
        </Paper>
      </Box>
      <Box
        className="AdminReview__Form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {review ? (
          <Card key={review.id} sx={{}}>
            {/* <CardMedia /> */}
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} md={12}>
                  <Typography>Details</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Date"
                    id="createdAt"
                    name="createdAt"
                    type="text"
                    value={new Date(
                      Date.parse(review.createdAt)
                    ).toLocaleString()}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Score"
                    id="score"
                    name="score"
                    type="text"
                    value={review.score}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    multiline
                    minRows={5}
                    label="Review Text"
                    id="text"
                    name="text"
                    type="text"
                    value={review.text}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography>Author</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    value={review.user.firstName + " " + review.user.lastName}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Email"
                    id="email"
                    name="email"
                    type="text"
                    value={review.user.email}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Phone"
                    id="phone"
                    name="phone"
                    type="text"
                    value={review.user.phone}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                to={"/admin/reviews/"}
              >
                Go Back
              </Button>
            </CardActions>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
