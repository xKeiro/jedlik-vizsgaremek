import React from "react";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
//import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";

import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [regState, setRegState] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    address: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
  });

  function handleRegChange(e) {
    const { name, value } = e.target;
    setRegState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleRegistration() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    if (regState.password !== regState.passwordConfirm) {
      setErrorText("Password fields do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: regState.username,
            first_name: regState.first_name,
            last_name: regState.last_name,
            email: regState.email,
            phone: regState.phone,
            password: regState.password,
            passwordConfirm: regState.passwordConfirm,
          },
          address: {
            address: regState.address,
            city: regState.city,
            region: regState.region,
            postal_code: regState.postal_code,
            country: regState.country,
          },
        }),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        const errorMsg = responseData.detail[0].msg;
        console.log(errorMsg);

        setIsLoading(false);
        setErrorText(errorMsg);
        return;
      }

      clearInputs();
      setIsLoading(false);
      setSuccessText("Registration successful.");
    } catch (err) {
      console.log(err);
      setErrorText("Registration failed.");
      setIsLoading(false);
    }
  }

  function clearInputs() {
    setRegState({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      address: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
    });
  }

  return (
    <div className="Registration">
      <div>
        <h2>Registration Form</h2>
      </div>
      <Box
        className="Registration__Form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
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
            {errorText && <AlertMessage type="error" message={errorText} />}
            {isLoading ? (
              <Loader />
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <span>User information</span>
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Username"
                    id="username"
                    name="username"
                    type="text"
                    helperText="This name will be shown under reviews."
                    value={regState.username}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="First Name"
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={regState.first_name}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={regState.last_name}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    helperText="We'll never share your email address."
                    value={regState.email}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone number"
                    id="phone"
                    name="phone"
                    type="text"
                    value={regState.phone}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    helperText="Minimum 8 characters."
                    value={regState.password}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Confirm Password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    value={regState.passwordConfirm}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <span>Address details</span>
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Address line"
                    id="address"
                    name="address"
                    type="text"
                    value={regState.address}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="City"
                    id="city"
                    name="city"
                    type="text"
                    value={regState.city}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Region"
                    id="region"
                    name="region"
                    type="text"
                    value={regState.region}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Postal Code"
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    value={regState.postal_code}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Country"
                    id="country"
                    name="country"
                    type="text"
                    value={regState.country}
                    onChange={handleRegChange}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ marginY: "20px", paddingY: "10px" }}
                    onClick={handleRegistration}
                  >
                    Register
                  </Button>
                </Grid>

                <Grid item xs={12} md={12}>
                  <span>Already have an account? </span>
                  <Link component={RouterLink} to={"/login"}>
                    Log in
                  </Link>
                  <span>.</span>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
