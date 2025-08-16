import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRouters from "./Routers/AdminRouters";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "./Store/ActionType"; // ✅ adjust path if needed
import Login from "./Pages/Login";
import Register from "./Pages/Register";

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
      {savedUser && savedToken && savedUser.role === "admin" ? (
        <Route path="/admin/*" element={<AdminRouters />} />
      ) : (
        <Route path="/*" element={<CustomerRoutes />} />
      )}
    </Routes>
  </div>
);

}

export default App;
