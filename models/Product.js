const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    Stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

});

module.exports = mongoose.model("product", productSchema);