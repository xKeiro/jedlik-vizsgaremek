import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import OrderForm from "../Shared/OrderForm";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
//import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserOrder() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function getOrder() {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/me/${id}`,
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
        setOrder(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    getOrder();
  }, [id]);

  return (
    <div className="UserOrder">
      <Box>
        <Paper elevation={2}>
          <h3>Your Order</h3>
        </Paper>
      </Box>
      <Box
        className="UserOrder__Form"
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
              <OrderForm order={order} />
            </CardContent>
            <CardActions>
              {" "}
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                to={"/orders"}
              >
                Back to my orders
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
