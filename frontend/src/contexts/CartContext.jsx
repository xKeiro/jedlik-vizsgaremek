import React from "react";

export default React.createContext({
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  removeProductsFromCart: (productId) => {},
});
