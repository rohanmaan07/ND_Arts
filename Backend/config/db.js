const mongoose = require("mongoose");
const mongodbUrl = "mongodb+srv://rohanmandal2208:yVYCJuZZRxlkMnJR@cluster0.9h1e6xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDb = () => {
    console.log("mongodb connected succesfully..")
    return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
