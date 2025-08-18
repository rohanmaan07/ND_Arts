import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Shirt,
  Paintbrush,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(false); // ✅ popup state
  const navigate = useNavigate();

  // ✅ Check jwt token on load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  // Navigation helpers
  const goTo = (path, requiresAuth = false) => {
    if (requiresAuth && !isLoggedIn) {
      setPopup(true); // ✅ show popup instead of alert
      return;
    }
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="text-[#DCE3E9]  relative sticky top-0 left-0 w-full z-50 " style={{ backgroundColor: "rgb(1, 9, 12)" }}>
      {/* Top Navbar */}
      <div className="max-w-7xl px-6 py-6 flex items-center">
        {/* Left side: Logo + main menu desktop */}
        <div className="flex items-center space-x-8">
          <div
            className="w-10 h-auto cursor-pointer"
            onClick={() => goTo("/")}
          >
            <img
              src="/log.png"
              alt="ND Arts Logo"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-medium text-lg">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => goTo("/clothing")}
            >
              Clothing
            </li>

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => goTo("/customize", true)}
            >
              Customize
            </li>
          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex space-x-8 items-center">
          <div
            onClick={() => goTo("/account/order", true)}
            className="flex items-center gap-2 hover:text-white cursor-pointer"
          >
            <Package size={20} />
            <span>Orders</span>
          </div>

          <div
            onClick={() => goTo("/cart", true)}
            className="flex items-center gap-2 hover:text-white cursor-pointer"
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
          </div>

          <div
            onClick={() => goTo("/profile", true)}
            className="flex items-center gap-2 hover:text-white cursor-pointer"
          >
            <User size={20} />
            <span>Profile</span>
          </div>

          {isLoggedIn ? (
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-white cursor-pointer"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          ) : (
            <div
              onClick={() => goTo("/login")}
              className="flex items-center gap-2 hover:text-white cursor-pointer"
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-4">
          <button
            onClick={() => setOpen(!open)}
            className="text-[#DCE3E9] hover:text-white transition"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      {open && (
        <div className="fixed inset-0  text-[#DCE3E9] flex flex-col justify-center items-center z-50" style={{ backgroundColor: "rgb(1, 9, 12)" }}>
          <ul className="flex flex-col gap-25 text-4xl font-medium text-center">
            <li
              onClick={() => goTo("/clothing")}
              className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
            >
              <Shirt size={40} /> Clothing
            </li>

            <li
              onClick={() => goTo("/customize", true)}
              className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
            >
              <Paintbrush size={40} /> Customize
            </li>

            <li
              onClick={() => goTo("/account/order", true)}
              className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
            >
              <Package size={45} /> Orders
            </li>
            <li
              onClick={() => goTo("/cart", true)}
              className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
            >
              <ShoppingCart size={45} /> Cart
            </li>
            <li
              onClick={() => goTo("/profile", true)}
              className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
            >
              <User size={45} /> Profile
            </li>

            {isLoggedIn ? (
              <li
                onClick={handleLogout}
                className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
              >
                <LogOut size={45} /> Logout
              </li>
            ) : (
              <li
                onClick={() => goTo("/login")}
                className="hover:text-white cursor-pointer flex items-center justify-center gap-3"
              >
                <LogIn size={45} /> Sign In
              </li>
            )}
          </ul>
        </div>
      )}

      {/* ✅ Custom Popup */}
 {popup && (
  <div className="fixed inset-0 flex items-center justify-center bg-[rgb(1,9,12)]/80 z-[999] animate-fadeIn">
    <div className="w-1/2 h-1/2 bg-[rgb(1,9,12)] text-[#DCE3E9] rounded-2xl shadow-2xl p-8 text-center transform scale-95 animate-scaleIn flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
      <p className="mb-8 text-base text-[#B0BEC5]">
        Please login to access this feature.
      </p>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => setPopup(false)}
          className="px-5 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition"
        >
          Close
        </button>
        <button
          onClick={() => {
            setPopup(false);
            navigate("/login");
          }}
          className="px-5 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  </div>
)}


    </nav>
  );
};

export default Navbar;
