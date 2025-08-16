import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Carts from "../components/Carts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import Checkout from "../components/Checkout";
import Order from "../components/Order";
import OrderDetails from "../components/OrderDetails";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PaymentSucces from "../Pages/PaymentSucces";
import Clothing from "../components/Clothing";
import Customize from "../components/Customize";
import Profiles from "../components/Profiles";
import NotFound from "../Pages/NotFound";

function CustomerRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:id" element={<OrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clothing" element={<Clothing/>}></Route>
        <Route path="/customize" element={<Customize/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profiles/>}/>
        <Route path="/payment/:order" element={<PaymentSucces />} />
         <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default CustomerRoutes;
