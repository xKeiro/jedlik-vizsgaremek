import React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import CircularProgress from "@mui/material/CircularProgress";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState(null);

  async function getReviews() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/product/${productId}`,
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
            sx={{ marginBottom: 3 }}
          >
            {reviews ? (
              reviews.map((review) => (
                <Grid item key={review.id} xs={12} md={12}>
                  <Card key={review.id}>
                    <Paper elevation={3}>
                      <CardContent>
                        <Box width={100}>
                          <Paper elevation={3}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {review.score} ☆
                            </Typography>
                          </Paper>
                        </Box>
                        <Typography gutterBottom variant="text" component="div">
                          "{review.text}"
                        </Typography>
                        <Typography
                          variant="text"
                          color="text.secondary"
                          align="right"
                        >
                          {review.user.firstName} at{" "}
                          {new Date(
                            Date.parse(review.createdAt)
                          ).toLocaleString()}
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
