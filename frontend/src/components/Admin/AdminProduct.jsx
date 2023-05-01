import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import AlertMessage from "../Shared/AlertMessage";
import ImageUpload from "../Shared/ImageUpload";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function AdminProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const newProduct = {
    id: "New product ID",
    categoryId: "select",
    basePrice: "",
    title: "",
    description: "",
    stock: "",
    discount: "",
    discontinued: false,
    featured: false,
    purchasePrice: "",
    supplierId: "select",
  };

  const emptyProductSupplier = {
    supplierId: "select",
    purchasePrice: "",
  };

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(null);
  const [allSuppliers, setAllSuppliers] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [newProductSupplier, setNewProductSupplier] =
    useState(emptyProductSupplier);

  useEffect(() => {
    async function getProduct() {
      if (!id) {
        setProduct(newProduct);
        return;
      }
      try {
        const response = await fetch(
          process.env.REACT_APP_API + `/api/products/${id}`,
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
          const errorMessage = responseBody.title;
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
        const response = await fetch(
          process.env.REACT_APP_API + "/api/categories",
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
          const errorMessage = responseBody.title;
          console.log(errorMessage);
          return;
        }
        setCategories(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    async function getAllSuppliers() {
      try {
        const response = await fetch(
          process.env.REACT_APP_API + "/api/suppliers",
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
          const errorMessage = responseBody.title;
          console.log(errorMessage);
          return;
        }
        setAllSuppliers(responseBody);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    getProduct();
    getCategories();
    getAllSuppliers();
    getProductSuppliers();
  }, [id]);

  async function getProductSuppliers() {
    if (!id) {
      return;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_API + `/api/suppliers/product/${id}`,
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
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      setSuppliers(responseBody);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleNewProductSupplierChange(e) {
    const { name, value } = e.target;
    setNewProductSupplier((prevState) => ({
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
    try {
      const response = await fetch(
        id
          ? process.env.REACT_APP_API + `/api/products/${id}`
          : process.env.REACT_APP_API + `/api/products/`,
        {
          method: id ? "PUT" : "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            categoryId: product.categoryId,
            basePrice: product.basePrice,
            title: product.title,
            description: product.description,
            stock: product.stock,
            discount: product.discount,
            discontinued: product.discontinued,
            featured: product.featured,
            purchasePrice: product.purchasePrice,
            supplierId: product.supplierId,
          }),
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        console.log(responseBody);

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

  async function handleProductSupplierDelete(supplierId) {
    if (!id) {
      return;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_API +
          `/api/suppliers/${supplierId}/product/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      console.log(responseBody);
      getProductSuppliers();
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async function handleProductSupplierAdd() {
    if (!id) {
      return;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_API + `/api/suppliers/product/${id}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newProductSupplier),
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage = responseBody.title;
        console.log(errorMessage);
        return;
      }
      console.log(responseBody);
      setNewProductSupplier(emptyProductSupplier);
      getProductSuppliers();
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className="AdminProduct">
      <Box>
        <Paper elevation={2}>
          <h3>{id ? "Product Editor" : "Add new product"}</h3>
        </Paper>
      </Box>
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
          <>
            <Card key={product.id} sx={{}}>
              {id ? (
                <CardMedia
                  sx={{ height: 400 }}
                  image={process.env.REACT_APP_API + "/" + product.imagePath}
                  title={product.title}
                />
              ) : (
                ""
              )}
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
                  </Grid>{" "}
                  {id ? (
                    <>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          label="Image"
                          id="imagePath"
                          name="imagePath"
                          type="text"
                          value={product.imagePath ? product.imagePath : "N/A"}
                          onChange={handleChange}
                          disabled={true}
                          autoComplete="off"
                        />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <ImageUpload endpoint="products" id={product.id} />
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
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
                    <FormControl fullWidth required>
                      <InputLabel id="category_id">Category</InputLabel>
                      <Select
                        sx={{ textAlign: "left" }}
                        labelId="categoryId"
                        id="categoryId"
                        name="categoryId"
                        value={product.categoryId}
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
                          <MenuItem value={product.categoryId}>
                            Loading...
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
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
                      inputProps={{ min: 0 }}
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
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={product.basePrice}
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      required
                      label="Discount (%)"
                      id="discount"
                      name="discount"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={product.discount}
                      onChange={handleChange}
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </Grid>
                  {!id ? (
                    <>
                      <Grid item xs={12} md={12}>
                        <FormControl fullWidth required>
                          <InputLabel id="supplierId">Supplier</InputLabel>
                          <Select
                            sx={{ textAlign: "left" }}
                            labelId="supplierId"
                            id="supplierId"
                            name="supplierId"
                            value={product.supplierId}
                            label="Supplier"
                            onChange={handleChange}
                            disabled={isLoading}
                            autoComplete="off"
                          >
                            <MenuItem value={"select"}>
                              Select Supplier...
                            </MenuItem>
                            {allSuppliers ? (
                              allSuppliers.map((supplier) => (
                                <MenuItem key={supplier.id} value={supplier.id}>
                                  {supplier.companyName}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value={""}>Loading...</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          required
                          label="Supplier Price"
                          id="purchasePrice"
                          name="purchasePrice"
                          type="number"
                          inputProps={{ min: 0 }}
                          value={product.purchasePrice}
                          onChange={handleChange}
                          disabled={isLoading}
                          autoComplete="off"
                        />
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
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
                            label="Discontinued (Disabled)"
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
                  disabled={
                    isLoading ||
                    product.categoryId === "select" ||
                    product.supplierId === "select" ||
                    product.title === "" ||
                    product.description === "" ||
                    product.stock === "" ||
                    product.basePrice === "" ||
                    product.basePrice < 1 ||
                    product.discount === "" ||
                    product.discount < 1 ||
                    product.purchasePrice === "" ||
                    product.purchasePrice < 1
                  }
                  onClick={handleProductUpdate}
                >
                  {id ? "Save" : "Add"} Product
                </Button>
              </CardActions>
            </Card>
            {id ? (
              <>
                <Box>
                  <Paper elevation={2}>
                    <h3>Product Suppliers</h3>
                  </Paper>
                </Box>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12} md={12}>
                    <TableContainer component={Paper}>
                      <Table aria-label="Ordered products">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {suppliers && allSuppliers ? (
                            <>
                              {suppliers.map((productSupplier) => (
                                <TableRow
                                  key={productSupplier.supplier.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                  hover
                                >
                                  <TableCell component="th" scope="row">
                                    <Link
                                      component={RouterLink}
                                      to={
                                        "/admin/supplier/" +
                                        productSupplier.supplier.id
                                      }
                                    >
                                      {productSupplier.supplier.companyName}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="right">
                                    {productSupplier.purchasePrice.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "EUR",
                                      }
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      variant="outlined"
                                      sx={{ marginLeft: 1 }}
                                      onClick={() =>
                                        handleProductSupplierDelete(
                                          productSupplier.supplier.id
                                        )
                                      }
                                      disabled={false}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  <Grid item xs={12} md={12}>
                                    <FormControl fullWidth required>
                                      <InputLabel id="newSupplierId">
                                        Supplier
                                      </InputLabel>
                                      <Select
                                        size="small"
                                        sx={{ textAlign: "left" }}
                                        labelId="newSupplierId"
                                        id="newSupplierId"
                                        name="supplierId"
                                        value={newProductSupplier.supplierId}
                                        label="Supplier"
                                        onChange={
                                          handleNewProductSupplierChange
                                        }
                                        disabled={isLoading}
                                        autoComplete="off"
                                      >
                                        <MenuItem value={"select"}>
                                          Select Supplier...
                                        </MenuItem>
                                        {allSuppliers ? (
                                          allSuppliers.map((supplier) => (
                                            <MenuItem
                                              key={supplier.id}
                                              value={supplier.id}
                                            >
                                              {supplier.companyName}
                                            </MenuItem>
                                          ))
                                        ) : (
                                          <MenuItem value={""}>
                                            Loading...
                                          </MenuItem>
                                        )}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </TableCell>
                                <TableCell align="right">
                                  <TextField
                                    size="small"
                                    fullWidth
                                    required
                                    label="New Supplier Price"
                                    id="newPurchasePrice"
                                    name="purchasePrice"
                                    type="number"
                                    value={newProductSupplier.purchasePrice}
                                    onChange={handleNewProductSupplierChange}
                                    disabled={isLoading}
                                    autoComplete="off"
                                  />
                                </TableCell>
                                <TableCell align="right">
                                  {" "}
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => handleProductSupplierAdd()}
                                    disabled={
                                      newProductSupplier.supplierId ===
                                        "select" ||
                                      newProductSupplier.purchasePrice === ""
                                    }
                                  >
                                    Add
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </>
                          ) : (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                                colSpan={3}
                              >
                                <CircularProgress />
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>{" "}
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </div>
  );
}
