import React, { useReducer } from "react";

import CartContext from "../contexts/CartContext";
import {
  CartReducer,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_PRODUCTS,
} from "./CartReducer";

const CartService = (props) => {
  // const [cart, setCart] = useState([]);
  const [cartState, dispatch] = useReducer(CartReducer, { cart: [] });

  const addProductToCart = (product) => {
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 10);
  };

  const removeProductFromCart = (productId) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 10);
  };

  const removeProductsFromCart = (productId) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCTS, productId: productId });
    }, 10);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        removeProductsFromCart: removeProductsFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartService;
