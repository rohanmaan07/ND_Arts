import React from "react";
import Admin from "../Admin/Admin";
import { Route, Routes, Navigate } from "react-router-dom";  // ✅ Navigate bhi import karo
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminRouters() {
  return (
    <div>
      <Routes>
        {/* ✅ agar sirf /admin hai toh /admin/products pe bhej do */}
        <Route path="/" element={<Navigate to="/admin/products" />} />


        {/* ✅ baaki sab Admin component handle karega */}
        <Route path="/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default AdminRouters;
