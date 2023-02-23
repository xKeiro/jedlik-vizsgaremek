import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AlertMessage from "../AlertMessage";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
//import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AdminProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const newProduct = {
      id: "New product ID",
      category_id: "select",
      base_price: "",
      title: "",
      description: "",
      photo: null,
      stock: "",
      discontinued: false,
      featured: false,
    };

    async function getProduct() {
      if (!id) {
        setProduct(newProduct);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${id}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
            },
            credentials: "include",
          }
        );
        const responseBody = await response.json();
        if (!response.ok) {
          const errorMessage = responseBody.detail[0].msg;
          console.log(errorMessage);
          return;
        }
        setProduct(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    async function getCategories() {
      try {
        const response = await fetch("http://localhost:8000/api/categories", {
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
        setCategories(responseBody.categories);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    getProduct();
    getCategories();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }

  async function handleProductUpdate() {
    setErrorText(null);
    setSuccessText(null);
    setIsLoading(true);

    if (product.category_id === "select") {
      setErrorText("Please select a category");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        id
          ? `http://localhost:8000/api/products/${id}`
          : `http://localhost:8000/api/products/`,
        {
          method: id ? "PATCH" : "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            category_id: product.category_id,
            base_price: product.base_price,
            title: product.title,
            description: product.description,
            photo: product.photo,
            stock: product.stock,
            discontinued: product.discontinued,
            featured: product.featured,
          }),
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.detail[0].msg;
        console.log(errorMessage);

        setIsLoading(false);
        setErrorText(errorMessage);
        return;
      }
      setSuccessText((id ? "Update" : "Add") + " request successful.");
      setIsLoading(false);
      if (!id) {
        navigate("/admin/product/" + responseBody.id);
      }
    } catch (error) {
      console.log(error);
      setErrorText((id ? "Update" : "Add") + " request failed.");
      setIsLoading(false);
      return;
    }
  }

  return (
    <div className="AdminProduct">
      <div>
        <h3>{id ? "Product Editor" : "Add new product"}</h3>
      </div>
      <Box
        className="AdminProduct__Form"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {product ? (
          <Card key={product.id} sx={{}}>
            {/* <CardMedia /> */}
            <CardContent>
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
                  {errorText && (
                    <AlertMessage type="error" message={errorText} />
                  )}
                  {isLoading ? <CircularProgress /> : ""}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="ID"
                    id="id"
                    name="id"
                    type="text"
                    value={product.id}
                    disabled={true}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="category_id">Category</InputLabel>
                    <Select
                      sx={{ textAlign: "left" }}
                      labelId="category_id"
                      id="category_id"
                      name="category_id"
                      value={product.category_id}
                      label="Categories"
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="off"
                    >
                      <MenuItem value={"select"}>Select Category...</MenuItem>
                      {categories ? (
                        categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.title}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={product.category_id}>
                          Loading...
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    label="Photo"
                    id="photo"
                    name="photo"
                    type="text"
                    value={product.photo ? product.photo : "N/A"}
                    onChange={handleChange}
                    disabled={true}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Title"
                    id="title"
                    name="title"
                    type="text"
                    value={product.title}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={5}
                    label="Description"
                    id="description"
                    name="description"
                    type="text"
                    value={product.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Stock"
                    id="stock"
                    name="stock"
                    type="number"
                    value={product.stock}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Base price"
                    id="base_price"
                    name="base_price"
                    type="number"
                    value={product.base_price}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="featured"
                              onChange={handleCheckboxChange}
                              disabled={isLoading}
                              checked={product.featured}
                            />
                          }
                          label="Featured"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="discontinued"
                              onChange={handleCheckboxChange}
                              disabled={isLoading}
                              checked={product.discontinued}
                            />
                          }
                          label="Discontinued (Removed)"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                disabled={isLoading}
                onClick={handleProductUpdate}
              >
                {id ? "Save" : "Add"} Product
              </Button>
            </CardActions>
          </Card>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
