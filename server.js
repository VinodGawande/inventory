const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const productRoutes = require("./routes/productRoutes");

dotenv.config();


const app = express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.json({message: "inventory managment api is running"});
});

app.use("/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, ()=>{
        console.log("server running on port 5000");
    });
})
.catch((error)=>{
    console.log("MongoDB connection failed:", error.message);
});