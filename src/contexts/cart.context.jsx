import { createContext, useReducer } from "react";

const addCartItem = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((item) => {
      return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item;
    });
  }
  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CART_ACTION_TYPES = {
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };

    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal },
    });
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (toggleCartDropdown) => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, payload: toggleCartDropdown });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
