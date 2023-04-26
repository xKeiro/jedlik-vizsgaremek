import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import AlertMessage from "../Shared/AlertMessage";
import UserForm from "../Shared/UserForm";

import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserRegistration() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const emptyForm = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    street: "",
    city: "",
    region: "",
    postalCode: "",
    country: "Hungary",
  };

  const [userForm, setUserForm] = useState(emptyForm);

  async function handleUserRegistration() {
    setErrorText("");
    setSuccessText("");
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: userForm.username,
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          phone: userForm.phone,
          password: userForm.password,
          passwordConfirm: userForm.passwordConfirm,
          street: userForm.street,
          city: userForm.city,
          region: userForm.region,
          postalCode: userForm.postalCode,
          country: userForm.country,
        }),
      });
      const responseBody = await response.json();

      if (!response.ok) {
        const errorMsg = responseBody.title;
        console.log(errorMsg);

        setIsLoading(false);
        setErrorText(errorMsg);
        return;
      }

      clearInputs();
      //setIsLoading(false);
      setSuccessText("Registration successful, logging in...");
      auth.login(responseBody);
      setTimeout(() => {
        navigate("/");
      }, 3000);
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
      <Box>
        <Paper elevation={2}>
          <h2>Registration</h2>
        </Paper>
      </Box>
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
          <Grid item xs={11} md={9}>
            <Paper elevation={2}>
              {successText && (
                <AlertMessage type="success" message={successText} />
              )}
              {errorText && <AlertMessage type="error" message={errorText} />}
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={0} padding={2} marginY={2}>
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
