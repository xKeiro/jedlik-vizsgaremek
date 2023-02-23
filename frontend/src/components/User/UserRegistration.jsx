import React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AlertMessage from "../AlertMessage";
import UserForm from "./UserForm";

import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const emptyForm = {
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
  };

  const [userForm, setUserForm] = useState(emptyForm);

  async function handleUserRegistration() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    if (userForm.password !== userForm.passwordConfirm) {
      setErrorText("Password fields do not match");
      setIsLoading(false);
      return;
    }

    if (userForm.password.length < 8) {
      setErrorText("Password length must be at least 8 charaters");
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
          username: userForm.username,
          first_name: userForm.first_name,
          last_name: userForm.last_name,
          email: userForm.email,
          phone: userForm.phone,
          password: userForm.password,
          passwordConfirm: userForm.passwordConfirm,
          address: {
            address: userForm.address,
            city: userForm.city,
            region: userForm.region,
            postal_code: userForm.postal_code,
            country: userForm.country,
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
    setUserForm(emptyForm);
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
                <UserForm
                  userForm={userForm}
                  setUserForm={setUserForm}
                  isNew={true}
                />
                <Grid item xs={12} md={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ marginY: "20px", paddingY: "10px" }}
                    onClick={handleUserRegistration}
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
