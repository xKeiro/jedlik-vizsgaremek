import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Shared/AlertMessage";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserReview({ productId }) {
  const navigate = useNavigate();
  const emptyReview = {
    productId: productId,
    score: 5,
    text: "",
  };
  const [reviewForm, setReviewForm] = useState(emptyReview);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  async function handleReviewSubmit() {
    setIsLoading(true);
    setErrorText("");
    setSuccessText("");
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          productId: reviewForm.productId,
          score: reviewForm.score,
          text: reviewForm.text,
        }),
        credentials: "include",
      });
      const responseBody = await response.json();

      if (!response.ok) {
        const errorMsg = responseBody.title + ": " + responseBody.detail;
        console.log(errorMsg);
        console.log(responseBody);

        setIsLoading(false);
        setErrorText(errorMsg);
        return;
      }

      setIsLoading(false);
      setSuccessText("Review Sent, refreshing...");
      setTimeout(() => {
        navigate(0);
      }, 3000);
    } catch (err) {
      console.log(err);
      setErrorText("Review failed.");
      setIsLoading(false);
    }
  }

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
      </Box>{" "}
      {successText && <AlertMessage type="success" message={successText} />}
      {errorText && <AlertMessage type="error" message={errorText} />}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              required
              disabled={isLoading}
              label="Review Text"
              id="text"
              name="text"
              type="text"
              helperText="This review will be shown with your first name."
              value={reviewForm.text}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <FormControl fullWidth required>
              <InputLabel id="score">Score</InputLabel>
              <Select
                sx={{ textAlign: "center" }}
                size="small"
                disabled={isLoading}
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
                (reviewForm.text.length > 2 && reviewForm.score
                  ? false
                  : true) || isLoading
              }
              onClick={() => handleReviewSubmit()}
            >
              Send Review
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
