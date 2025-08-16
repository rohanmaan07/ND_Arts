import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  Drawer,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useNavigate, Routes, Route, NavLink } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Create from "./Create";
import ProductAd from "./ProductAd";
import OrdersAd from "./OrdersAd";
import { Loader } from "../Pages/Loader";
import CustomOrders from "./CustomOrders";

const menuItems = [
  { name: "Products", path: "/admin/products", icon: <InventoryIcon /> },
  { name: "Custom Orders", path: "/admin/customs", icon: <PeopleIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <ReceiptLongIcon /> },
  { name: "Add Product", path: "/admin/product/create", icon: <AddBoxIcon /> },
];

const drawerWidth = 240;

const Admin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null means "checking"

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const DrawerMenu = () => (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "rgb(1, 9, 12)",
        color: "#DCE3E9",
        py: 2,
      }}
    >
      <Box>
        <Toolbar />
        <List sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === "/admin"}
                sx={{
                  "&.active": {
                    backgroundColor: "rgba(220, 227, 233, 0.18)",
                    borderRadius: "8px",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(220, 227, 233, 0.1)",
                    borderRadius: "8px",
                  },
                  color: "#DCE3E9",
                }}
              >
                <ListItemIcon sx={{ color: "#DCE3E9" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Divider sx={{ backgroundColor: "#444", mb: 1 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "#DCE3E9" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  if (isLoggedIn === null) return <Loader />;
  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  return (
    
    <Box sx={{ display: isLargeScreen ? "flex" : "block" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(1, 9, 12)",
            color: "#DCE3E9",
          },
        }}
      >
        <DrawerMenu />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
         
          backgroundColor: "rgb(1, 9, 12)",
          color: "#DCE3E9",
        }}
      >
    
        <Toolbar />
        
     <Routes>
          <Route path="products" element={<ProductAd />} />
          <Route path="customs" element={<CustomOrders />} />
          <Route path="orders" element={<OrdersAd />} />
          <Route path="product/create" element={<Create />} />
        </Routes>

      </Box>
       
    </Box>
    
  );
};

export default Admin;
