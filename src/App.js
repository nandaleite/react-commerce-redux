import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

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
