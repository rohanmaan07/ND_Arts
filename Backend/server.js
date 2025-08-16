require('dotenv').config();
const app=require("./index");
const { connectDb } = require("./config/db");

app.listen(8080,async()=>{
    await connectDb();
    console.log("App server is listing..");
})