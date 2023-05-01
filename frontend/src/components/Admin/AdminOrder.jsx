import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AlertMessage from "../Shared/AlertMessage";
import OrderForm from "../Shared/OrderForm";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
//import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

export default function AdminOrder() {
  //const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const orderStates = [
    "InProgress",
    "UnderProcurement",
    "Fulfilled",
    "Deleted",
  ];

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function getOrder() {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(
          process.env.REACT_APP_API + `/api/orders/${id}`,
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
        process.env.REACT_APP_API +
          `/api/orders/${id}/status?status=${order.status}`,
        {
          method: "PATCH",
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
          <h3>Order Editor</h3>
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
        {successText && <AlertMessage type="success" message={successText} />}
        {errorText && <AlertMessage type="error" message={errorText} />}
        {isLoading ? <CircularProgress /> : ""}
        {order ? (
          <Card key={order.id} sx={{}}>
            {/* <CardMedia /> */}
            <CardContent>
              <OrderForm order={order} />
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ marginTop: 1 }}
              >
                <Grid item xs={12} md={12}>
                  <TextField
                    variant="filled"
                    fullWidth
                    label="Profit on order"
                    id="profit"
                    name="profit"
                    type="text"
                    value={order.profit.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EUR",
                    })}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography>Order Status</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      sx={{ textAlign: "left" }}
                      labelId="status"
                      id="status"
                      name="status"
                      value={order.status}
                      label="Status"
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="off"
                    >
                      <MenuItem value={"select"}>Select Status...</MenuItem>
                      {orderStates ? (
                        orderStates.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={order.status}>Loading...</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={isLoading || order.status === "select"}
                onClick={handleOrderStatusUpdate}
              >
                Change Status
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
