import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRouters from "./Routers/AdminRouters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./Store/ActionType"; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("jwt");

    if (savedUser && savedToken) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user: JSON.parse(savedUser),
          jwt: savedToken,
        },
      });
    }
  }, []);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedToken = localStorage.getItem("jwt");

  return (
    <div style={{ backgroundColor: "rgb(1, 9, 12)" }}>
      <Routes>
        {/* ✅ Agar admin hai */}
        {savedUser && savedToken && savedUser.role === "admin" ? (
          <>
            {/* root / pe direct admin/products */}
            <Route path="/" element={<Navigate to="/admin/products" />} />
            <Route path="/admin/*" element={<AdminRouters />} />
          </>
        ) : (
          <>
            {/* Agar customer hai */}
            <Route path="/*" element={<CustomerRoutes />} />
          </>
        )}
      </Routes>
    </div>
  );
}
