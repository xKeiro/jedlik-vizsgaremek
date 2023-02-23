import React from "react";
import { useState, useEffect } from "react";
import AlertMessage from "../AlertMessage";
import UserForm from "./UserForm";

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
        const response = await fetch(`http://localhost:8000/api/users/me`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        });
        const responseBody = await response.json();
        if (!response.ok) {
          const errorMessage = responseBody.detail[0].msg;
          console.log(errorMessage);
          return;
        }
        console.log(responseBody);
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
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,

      id: user.id,
      is_admin: user.is_admin,
      //password: "",
      //passwordConfirm: "",

      address: user.address.address,
      city: user.address.city,
      region: user.address.region,
      postal_code: user.address.postal_code,
      country: user.address.country,
    });
    setIsLoading(false);
  }, [user]);

  async function handleUserUpdate() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/" + user.id, //todo: /me PATCH endpoint
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
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
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.detail[0].msg;
        console.log(errorMsg);

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
      <div>
        <h2>Account</h2>
      </div>
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
          <Grid item xs={11} md={8}>
            {successText && (
              <AlertMessage type="success" message={successText} />
            )}
            {errorText && <AlertMessage type="error" message={errorText} />}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={1}>
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
