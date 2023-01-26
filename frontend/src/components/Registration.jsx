import React from "react";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
//import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "./AlertMessage";

import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

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
    country: "HU",
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
          username: regState.username,
          first_name: regState.first_name,
          last_name: regState.last_name,
          email: regState.email,
          phone: regState.phone,
          password: regState.password,
          passwordConfirm: regState.passwordConfirm,
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
              <CircularProgress />
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
                    autoComplete="off"
                  />
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
                    autoComplete="off"
                  />
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
                    autoComplete="off"
                  />
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
                    autoComplete="off"
                  />
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
                    autoComplete="off"
                  />
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
                    autoComplete="new-password"
                  />
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
                    autoComplete="new-password"
                  />
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
                    value={regState.city}
                    onChange={handleRegChange}
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
                    value={regState.region}
                    onChange={handleRegChange}
                    autoComplete="off"
                  />
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
                      value={regState.country}
                      label="Countries"
                      onChange={handleRegChange}
                      autoComplete="off"
                    >
                      <MenuItem value={"AT"}>Austria</MenuItem>
                      <MenuItem value={"BE"}>Belgium</MenuItem>
                      <MenuItem value={"BG"}>Bulgaria</MenuItem>
                      <MenuItem value={"HR"}>Croatia</MenuItem>
                      <MenuItem value={"CY"}>Cyprus</MenuItem>
                      <MenuItem value={"CZ"}>Czechia</MenuItem>
                      <MenuItem value={"DK"}>Denmark</MenuItem>
                      <MenuItem value={"EE"}>Estonia</MenuItem>
                      <MenuItem value={"FI"}>Finland</MenuItem>
                      <MenuItem value={"FR"}>France</MenuItem>
                      <MenuItem value={"DE"}>Germany</MenuItem>
                      <MenuItem value={"GR"}>Greece</MenuItem>
                      <MenuItem value={"HU"}>Hungary</MenuItem>
                      <MenuItem value={"IE"}>Ireland</MenuItem>
                      <MenuItem value={"IT"}>Italy</MenuItem>
                      <MenuItem value={"LV"}>Latvia</MenuItem>
                      <MenuItem value={"LT"}>Lithuania</MenuItem>
                      <MenuItem value={"LU"}>Luxembourg</MenuItem>
                      <MenuItem value={"MT"}>Malta</MenuItem>
                      <MenuItem value={"NL"}>Netherlands</MenuItem>
                      <MenuItem value={"PL"}>Poland</MenuItem>
                      <MenuItem value={"PT"}>Portugal</MenuItem>
                      <MenuItem value={"RO"}>Romania</MenuItem>
                      <MenuItem value={"SK"}>Slovakia</MenuItem>
                      <MenuItem value={"SI"}>Slovenia</MenuItem>
                      <MenuItem value={"ES"}>Spain</MenuItem>
                      <MenuItem value={"SE"}>Sweden</MenuItem>
                    </Select>
                  </FormControl>
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
