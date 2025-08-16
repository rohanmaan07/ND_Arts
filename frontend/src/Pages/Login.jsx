import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signin`, formData);
      const { jwt, user } = res.data;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      const res = await axios.post(`${API_BASE_URL}/auth/google`, { credential });
      const { jwt, user } = res.data;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (error) {
      console.error("Google login error", error);
      alert("Google login failed");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{ backgroundColor: "rgb(1, 9, 12)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#142836] text-[#DCE3E9] p-10 rounded-xl w-full max-w-md shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#1F3B53] text-[#DCE3E9] p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DCE3E9] placeholder:text-[#B0BAC5]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#DCE3E9] text-[#142836] font-semibold py-3 rounded-lg hover:bg-white hover:text-[#142836] transition"
        >
          Login
        </button>

        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
              alert("Google Login Failed");
            }}
          />
        </div>

        <p className="text-center text-sm mt-3">
          Don't have an account?{" "}
          <span
            onClick={goToRegister}
            className="text-white underline cursor-pointer hover:text-[#DCE3E9]"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
