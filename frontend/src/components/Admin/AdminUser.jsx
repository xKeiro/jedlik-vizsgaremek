import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AlertMessage from "../Shared/AlertMessage";
import UserForm from "../Shared/UserForm";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function AdminUser() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [user, setUser] = useState(null);
  const [userForm, setUserForm] = useState(null);

  useEffect(() => {
    async function getUser() {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
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
          return;
        }
        setUser(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    getUser();
  }, [id]);

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

  async function handleUserPromote() {
    setErrorText("");
    setSuccessText("");
    setIsLoading(true);

    try {
      const response = await fetch(
        user.isAdmin
          ? `http://localhost:5000/api/users/demote/${user.id}`
          : `http://localhost:5000/api/users/promote/${user.id}`,
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.title;
        console.log(errorMsg);

        setIsLoading(false);
        setErrorText(errorMsg);
        return;
      }
      setUser(responseData);
      setIsLoading(false);
      setSuccessText("Update successful.");
    } catch (err) {
      console.log(err);
      setErrorText("Update failed.");
      setIsLoading(false);
    }
  }

  return (
    <div className="AdminUser">
      <Box>
        <Paper elevation={2}>
          <h3>User</h3>
        </Paper>
      </Box>
      <Box
        className="AdminUser__Form"
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
                      onClick={handleUserPromote}
                    >
                      Toggle Admin Privileges
                    </Button>{" "}
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
