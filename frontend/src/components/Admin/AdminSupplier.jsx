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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AdminSupplier() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const newSupplier = {
      companyName: "",
      contactFirstName: "",
      contactLastName: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "Hungary",
    };

    async function getSupplier() {
      if (!id) {
        setSupplier(newSupplier);
        return;
      }
      try {
        const response = await fetch(
          process.env.REACT_APP_API + `/api/suppliers/${id}`,
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
          ? process.env.REACT_APP_API + `/api/suppliers/${id}`
          : process.env.REACT_APP_API + `/api/suppliers/`,
        {
          method: id ? "PUT" : "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            companyName: supplier.companyName,
            contactFirstName: supplier.contactFirstName,
            contactLastName: supplier.contactLastName,
            phone: supplier.phone,
            email: supplier.email,
            price: supplier.price,
            street: supplier.street,
            city: supplier.city,
            region: supplier.region,
            postalCode: supplier.postalCode,
            country: supplier.country,
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

  const countries = [
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
  ];

  return (
    <div className="AdminSupplier">
      <Box>
        <Paper elevation={2}>
          <h3>{id ? "Supplier Editor" : "Add new supplier"}</h3>
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
                    label="Company Name"
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={supplier.companyName}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Contact First Name"
                    id="contactFirstName"
                    name="contactFirstName"
                    type="text"
                    value={supplier.contactFirstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Contact Last Name"
                    id="contactLastName"
                    name="contactLastName"
                    type="text"
                    value={supplier.contactLastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
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
                    label="Street"
                    id="street"
                    name="street"
                    type="text"
                    value={supplier.street}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="City"
                    id="city"
                    name="city"
                    type="text"
                    value={supplier.city}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Region"
                    id="region"
                    name="region"
                    type="text"
                    value={supplier.region}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Postal Code"
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={supplier.postalCode}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                      sx={{ textAlign: "left" }}
                      labelId="country"
                      id="country"
                      name="country"
                      value={supplier.country}
                      label="Countries"
                      onChange={handleChange}
                      autoComplete="off"
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
