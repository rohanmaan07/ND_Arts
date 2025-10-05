const express=require ("express");
const cors=require ("cors");
const app=express();
const authRouters=require("./Routes/AuthR");
const userRouters=require("./Routes/UserR");
const productRouters=require("./Routes/ProductR");
const adminProRouters=require("./Routes/AdminProductR");
const adminOrderRouters=require("./Routes/AdminOrderR");
const cartRouters=require("./Routes/CartR");
const cartItemsRouters=require("./Routes/CartItemR");
const orderRouters=require("./Routes/orderR");
const categoryRouters=require("./Routes/CategoryR");
const paymetRouters=require("./Routes/PaymentR")
const customOrderRouters=require("./Routes/CustomR")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');
app.use('/uploads/customOrders', express.static(path.join(__dirname, 'uploads/customOrders')));

// baki app setup aur routes


app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nd-arts-2grq.onrender.com",
    "https://ndarts.vercel.app"
  ],
  credentials: true,
}));



app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to our api",status:true});
})

app.use("/auth",authRouters);
app.use("/api/users",userRouters);
app.use("/api/products",productRouters);
app.use("/api/admin/products",adminProRouters);
app.use("/api/admin/order",adminOrderRouters);
app.use("/api/cart",cartRouters);
app.use('/api/admin/categories', categoryRouters);
app.use("/api/cartItems",cartItemsRouters);
app.use("/api/orders",orderRouters);
app.use("/api/custom-orders", customOrderRouters);
app.use("/api/payments",paymetRouters);
module.exports=app;
