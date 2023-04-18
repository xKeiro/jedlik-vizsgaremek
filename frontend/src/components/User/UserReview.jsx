import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

export default function UserReview({ productId }) {
  const [reviewForm, setReviewForm] = useState({ score: 5, review: "" });
  function handleFormChange(e) {
    const { name, value } = e.target;
    setReviewForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <Box>
        <Paper elevation={3}>
          <h3>Send review (WIP)</h3>
        </Paper>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField
            multiline
            rows={4}
            fullWidth
            required
            label="Review"
            id="review"
            name="review"
            type="text"
            helperText="This review will be shown with your username."
            value={reviewForm.review}
            onChange={handleFormChange}
            autoComplete="off"
          />
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth required>
            <InputLabel id="score">Score</InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="score"
              id="score"
              name="score"
              value={reviewForm.score}
              label="Score"
              onChange={handleFormChange}
              autoComplete="off"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            disabled={
              reviewForm.review.length > 2 && reviewForm.score ? false : true
            }
            //onClick={() => }
          >
            Send Review
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
