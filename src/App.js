import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

const Hats = () => {
  return <h1>Hats page</h1>;
};
const Dresses = () => {
  return <h1>Dresses page</h1>;
};
const Bags = () => {
  return <h1>Bags page</h1>;
};
const Shoes = () => {
  return <h1>Shoes page</h1>;
};
const Accessories = () => {
  return <h1>Accessories page</h1>;
};
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="hats" element={<Hats />} />
        <Route path="dresses" element={<Dresses />} />
        <Route path="bags" element={<Bags />} />
        <Route path="shoes" element={<Shoes />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
