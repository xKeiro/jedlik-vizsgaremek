import React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

import CircularProgress from "@mui/material/CircularProgress";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState(null);

  async function getReviews() {
    try {
      const response = await fetch(
        process.env.REACT_APP_API + `/api/reviews/product/${productId}`,
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
      console.log(responseBody);
      setReviews(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <div className="Product">
        <Box
          className="Reviews__Box"
          sx={{
            margin: "20px",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <Box>
            <Paper elevation={3}>
              <h3>Reviews</h3>
            </Paper>
            <Typography variant="text" color="text.primary">
              {reviews
                ? `${reviews.length} reviews submitted, average score: ${
                    reviews.length > 0
                      ? (
                          reviews.reduce((acc, curr) => acc + curr.score, 0) /
                          reviews.length
                        ).toFixed(2)
                      : 0
                  } ☆`
                : "..."}
            </Typography>
          </Box>
          <Grid
            container
            direction="row-reverse"
            justifyContent="center"
            spacing={2}
            sx={{ marginY: 3 }}
          >
            {reviews ? (
              reviews.map((review) => (
                <Grid item key={review.id} xs={12} md={12}>
                  <Card key={review.id}>
                    <Paper elevation={3}>
                      <CardContent>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item xs={12} md={1}>
                            <Paper elevation={3}>
                              <Box sx={{ minHeight: 50, padding: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  align="center"
                                >
                                  {review.score} ☆
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper elevation={3}>
                              <Box sx={{ minHeight: 50, padding: 1 }}>
                                <Grid container>
                                  <Grid item xs={4} md={2}>
                                    <Avatar
                                      alt={review.user.firstName}
                                      src={
                                        review.user.imagePath
                                          ? process.env.REACT_APP_API +
                                            "/" +
                                            review.user.imagePath
                                          : null
                                      }
                                    />{" "}
                                  </Grid>{" "}
                                  <Grid item xs={8} md={10}>
                                    <Typography
                                      gutterBottom
                                      variant="h6"
                                      component="div"
                                      align="left"
                                    >
                                      {review.user.firstName}
                                    </Typography>{" "}
                                  </Grid>
                                </Grid>
                              </Box>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={5}>
                            <Paper elevation={3}>
                              <Box
                                sx={{
                                  minHeight: 50,
                                  padding: 1,
                                }}
                              >
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                >
                                  {" "}
                                  {new Date(
                                    Date.parse(review.createdAt)
                                  ).toLocaleString()}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                        </Grid>
                        <Typography
                          sx={{ marginY: 2 }}
                          variant="text"
                          component="div"
                        >
                          "{review.text}"
                        </Typography>
                      </CardContent>
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
    </>
  );
}
