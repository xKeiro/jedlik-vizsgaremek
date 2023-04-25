import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AlertMessage from "../Shared/AlertMessage";

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

export default function AdminSupplier() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const newSupplier = {
      company_name: "",
      contact_first_name: "",
      contact_last_name: "",
      email: "",
      phone: "",
    };

    async function getSupplier() {
      if (!id) {
        setSupplier(newSupplier);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/suppliers/${id}`,
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
        setSupplier(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    getSupplier();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSupplier((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleProductUpdate() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        id
          ? `http://localhost:5000/api/suppliers/${id}`
          : `http://localhost:5000/api/suppliers/`,
        {
          method: id ? "PATCH" : "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            company_name: supplier.company_name,
            contact_first_name: supplier.contact_first_name,
            contact_last_name: supplier.contact_last_name,
            email: supplier.email,
            phone: supplier.phone,
            price: supplier.price,
          }),
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
      setSuccessText((id ? "Update" : "Add") + " request successful.");
      setIsLoading(false);
      if (!id) {
        navigate("/admin/supplier/" + responseBody.id);
      }
    } catch (error) {
      console.log(error);
      setErrorText((id ? "Update" : "Add") + " request failed.");
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="AdminSupplier">
      <Box>
        <Paper elevation={2}>
          <h3>{id ? "Supplier Editor" : "Add new supplier"} (WIP)</h3>
        </Paper>
      </Box>
      <Box
        className="AdminSupplier__Form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {supplier ? (
          <Card key={supplier.id} sx={{}}>
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
                    label="Supplier ID"
                    id="id"
                    name="id"
                    type="text"
                    value={supplier.id}
                    disabled={true}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Company Name"
                    id="cname"
                    name="company_name"
                    type="text"
                    value={supplier.company_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Contact First Name"
                    id="contact_first_name
                    "
                    name="contact_first_name
                    "
                    type="text"
                    value={supplier.contact_first_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Contact Last Name"
                    id="contact_last_name"
                    name="contact_last_name"
                    type="text"
                    value={supplier.contact_last_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    id="email"
                    name="email"
                    type="text"
                    value={supplier.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Phone"
                    id="phone"
                    name="phone"
                    type="text"
                    value={supplier.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={isLoading}
                onClick={handleProductUpdate}
              >
                {id ? "Save" : "Add"} Supplier
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
