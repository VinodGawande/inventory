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

const mongoOptions = {};

if (process.env.MONGO_TLS_ALLOW_INVALID_CERTIFICATES === "true") {
    mongoOptions.tlsAllowInvalidCertificates = true;
}

mongoose.connect(process.env.MONGO_URI, mongoOptions)
.then(()=>{
    console.log("MongoDB connected");

    const port = process.env.PORT || process.env.port || 5000;

    app.listen(port, ()=>{
        console.log(`server running on port ${port}`);
    });
})
.catch((error)=>{
    console.log("MongoDB connection failed:", error.message);
});
