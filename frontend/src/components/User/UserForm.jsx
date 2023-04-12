import React from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function UserForm({ userForm, setUserForm, isNew }) {
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
              label="id"
              id="id"
              name="id"
              type="text"
              helperText="For debug purposes only."
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
              id="is_admin"
              name="is_admin"
              type="text"
              value={userForm.is_admin ? "Admin" : "User"}
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
          id="first_name"
          name="first_name"
          type="text"
          value={userForm.first_name}
          onChange={handleFormChange}
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
          value={userForm.last_name}
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
          helperText="We'll never share your email address."
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
          value={userForm.address}
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
          id="postal_code"
          name="postal_code"
          type="text"
          value={userForm.postal_code}
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
    </Grid>
  );
}
