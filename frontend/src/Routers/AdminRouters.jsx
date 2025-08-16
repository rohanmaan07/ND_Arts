import React from "react";
import Admin from "../Admin/Admin";
import { Route, Routes, Navigate } from "react-router-dom";  // ✅ Navigate bhi import karo
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminRouters() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Navigate to="products" />} />
        <Route path="/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default AdminRouters;
