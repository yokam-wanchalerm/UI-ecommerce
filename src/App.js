import Register from "./page/Register";
import Login from "./page/Login";
import Home from "./page/Home";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Products from "./page/product/Products";
import Product from "./page/product/Product";
import Cart from "./page/Cart";
import Logout from "./page/Logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        {/* <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route> */}
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/" element={<Home />} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
