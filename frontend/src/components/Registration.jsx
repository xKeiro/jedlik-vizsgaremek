import React from "react";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
//import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "@mui/material";

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
        <h2>Registration</h2>
      </div>
      {successText && <AlertMessage type="success" message={successText} />}
      {errorText && <AlertMessage type="error" message={errorText} />}
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          className="Registration__Form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <h3>User information</h3>
          <FormControl sx={{ marginY: "10px" }}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              type="text"
              aria-describedby="Enter username"
              value={regState.username}
              onChange={handleRegChange}
            />
            <FormHelperText id="helper-text">
              This name will be shown under reviews.
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ marginY: "10px" }}>
            <InputLabel htmlFor="first_name">First Name</InputLabel>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              aria-describedby="Enter first name"
              value={regState.first_name}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "10px" }}>
            <InputLabel htmlFor="last_name">Last Name</InputLabel>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              aria-describedby="Enter last name"
              value={regState.last_name}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "10px" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              aria-describedby="Enter email"
              value={regState.email}
              onChange={handleRegChange}
            />
            <FormHelperText id="helper-text">
              We'll never share your email address.
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ marginY: "10px" }}>
            <InputLabel htmlFor="phone">Phone number</InputLabel>
            <Input
              id="phone"
              name="phone"
              type="text"
              aria-describedby="Enter phone number"
              value={regState.phone}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              aria-describedby="Enter password"
              value={regState.password}
              onChange={handleRegChange}
            />
            <FormHelperText id="helper-text">
              Minimum 8 characters.
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              aria-describedby="Confirm password"
              value={regState.passwordConfirm}
              onChange={handleRegChange}
            />
          </FormControl>
          <h3>Address details</h3>
          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="address">Address line</InputLabel>
            <Input
              id="address"
              name="address"
              type="text"
              aria-describedby="Enter address line"
              value={regState.address}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="city">City</InputLabel>
            <Input
              id="city"
              name="city"
              type="text"
              aria-describedby="Enter city"
              value={regState.city}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="region">Region</InputLabel>
            <Input
              id="region"
              name="region"
              type="text"
              aria-describedby="Enter region"
              value={regState.region}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="postal_code">Postal Code</InputLabel>
            <Input
              id="postal_code"
              name="postal_code"
              type="text"
              aria-describedby="Enter postal code"
              value={regState.postal_code}
              onChange={handleRegChange}
            />
          </FormControl>

          <FormControl sx={{ marginY: "20px" }}>
            <InputLabel htmlFor="country">Country</InputLabel>
            <Input
              id="country"
              name="country"
              type="text"
              aria-describedby="Enter country"
              value={regState.country}
              onChange={handleRegChange}
            />
          </FormControl>

          <Button
            variant="contained"
            sx={{ margin: "20px", padding: "10px" }}
            onClick={handleRegistration}
          >
            Register
          </Button>

          <div>
            <span>Already have an account? </span>
            <Link component={RouterLink} to={"/login"}>
              Log in
            </Link>
            <span>.</span>
          </div>
        </Box>
      )}
    </div>
  );
}
