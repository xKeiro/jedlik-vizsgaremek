import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AlertMessage from "../AlertMessage";

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

export default function AdminOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function getOrder() {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        const responseBody = await response.json();
        if (!response.ok) {
          const errorMessage = responseBody.title;
          console.log(errorMessage);
          return;
        }
        setOrder(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    getOrder();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleOrderStatusUpdate() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/orders/${id}/Status`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(""), //todo
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }
      setOrder(responseBody);
      setSuccessText("Update request successful.");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setErrorText("Update request failed.");
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="AdminOrder">
      <Box>
        <Paper elevation={2}>
          <h3>Order Editor (WIP)</h3>
        </Paper>
      </Box>
      <Box
        className="AdminOrder__Form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {order ? (
          <Card key={order.id} sx={{}}>
            {/* <CardMedia /> */}
            <CardContent>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={11} md={8}>
                  {successText && (
                    <AlertMessage type="success" message={successText} />
                  )}
                  {errorText && (
                    <AlertMessage type="error" message={errorText} />
                  )}
                  {isLoading ? <CircularProgress /> : ""}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="ID"
                    id="id"
                    name="id"
                    type="text"
                    value={order.id}
                    disabled={true}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  Ordered products (WIP)
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Order ID"
                    id="id"
                    name="id"
                    type="text"
                    value={order.id}
                    onChange={handleChange}
                    disabled={true}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={5}
                    label="Order Date"
                    id="dorderDate"
                    name="orderDate"
                    type="text"
                    value={order.orderDate}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Shipper Name"
                    id="shipper"
                    name="shipper"
                    type="text"
                    value={order.shipper.company_name}
                    onChange={handleChange}
                    disabled={true}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Status"
                    id="status"
                    name="status"
                    type="text"
                    value={order.status}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}></Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={isLoading}
                onClick={handleOrderStatusUpdate}
              >
                Save Order (WIP)
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
