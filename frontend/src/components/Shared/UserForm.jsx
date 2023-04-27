import React from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";

export default function UserForm({ userForm, setUserForm, isNew }) {
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

  function handleFormChange(e) {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography>User information</Typography>
      </Grid>
      <Grid item xs={3} md={1}>
        <Box sx={{ paddingLeft: 1, paddingTop: 1 }}>
          <Avatar
            alt={userForm.username}
            src={
              userForm.imagePath
                ? process.env.REACT_APP_API + "/" + userForm.imagePath
                : null
            }
          />
        </Box>
      </Grid>

      <Grid item xs={9} md={11}>
        <TextField
          fullWidth
          required
          label="Username"
          id="username"
          name="username"
          type="text"
          helperText="This name will be shown under reviews."
          value={userForm.username}
          onChange={handleFormChange}
          autoComplete="off"
        />
      </Grid>

      {isNew ? (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Your Password"
              id="password"
              name="password"
              type="password"
              helperText="Minimum 8 characters."
              value={userForm.password}
              onChange={handleFormChange}
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
              value={userForm.passwordConfirm}
              onChange={handleFormChange}
              autoComplete="new-password"
            />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled
              label="Client ID"
              id="id"
              name="id"
              type="text"
              value={userForm.id}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled
              label="Privileges"
              id="isAdmin"
              name="isAdmin"
              type="text"
              value={userForm.isAdmin ? "Admin" : "User"}
              onChange={handleFormChange}
              autoComplete="off"
            />
          </Grid>
        </>
      )}

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="First Name"
          id="firstName"
          name="firstName"
          type="text"
          value={userForm.firstName}
          onChange={handleFormChange}
          autoComplete="off"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="Last Name"
          id="lastName"
          name="lastName"
          type="text"
          value={userForm.lastName}
          onChange={handleFormChange}
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
          helperText="We'll never share your email address with third parties."
          value={userForm.email}
          onChange={handleFormChange}
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
          value={userForm.phone}
          onChange={handleFormChange}
          autoComplete="off"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Typography>Address details</Typography>
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          required
          label="Street"
          id="street"
          name="street"
          type="text"
          value={userForm.street}
          onChange={handleFormChange}
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
          value={userForm.city}
          onChange={handleFormChange}
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
          value={userForm.region}
          onChange={handleFormChange}
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
          value={userForm.postalCode}
          onChange={handleFormChange}
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
            value={userForm.country}
            label="Countries"
            onChange={handleFormChange}
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
  );
}
