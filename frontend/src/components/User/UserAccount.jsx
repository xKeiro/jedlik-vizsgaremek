import React from "react";
import { useState, useEffect } from "react";
import AlertMessage from "../Shared/AlertMessage";
import UserForm from "../Shared/UserForm";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [user, setUser] = useState(null);
  const [userForm, setUserForm] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`http://localhost:5000/api/users/me`, {
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
          console.log(responseBody);
          return;
        }
        setUser(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!user) {
      return;
    }
    setUserForm({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      id: user.id,
      isAdmin: user.isAdmin,
      //password: "",
      //passwordConfirm: "",
      street: user.street,
      city: user.city,
      region: user.region,
      postalCode: user.postalCode,
      country: user.country,
    });
    setIsLoading(false);
  }, [user]);

  async function handleUserUpdate() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: userForm.username,
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          phone: userForm.phone,
          //password: userForm.password,
          //passwordConfirm: userForm.passwordConfirm,
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
        console.log(responseBody);

        setIsLoading(false);
        setErrorText(errorMsg);
        return;
      }

      setIsLoading(false);
      setSuccessText("Update successful.");
    } catch (err) {
      console.log(err);
      setErrorText("Update failed.");
      setIsLoading(false);
    }
  }

  return (
    <div className="Account">
      <Box>
        <Paper elevation={2}>
          <h2>Your Account</h2>
        </Paper>
      </Box>
      <Box
        className="Account__Form"
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
            <Paper elevation={3}>
              {" "}
              {successText && (
                <AlertMessage type="success" message={successText} />
              )}
              {errorText && <AlertMessage type="error" message={errorText} />}
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={0} padding={2} marginY={2}>
                  {userForm && (
                    <UserForm
                      userForm={userForm}
                      setUserForm={setUserForm}
                      isNew={false}
                    />
                  )}
                  <Grid item xs={12} md={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ marginY: "20px", paddingY: "10px" }}
                      onClick={handleUserUpdate}
                    >
                      Save
                    </Button>
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
