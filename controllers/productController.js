const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

const isPositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) > 0;

const createProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        if (!isPositiveNumber(price)) {
            return res.status(400).json({ message: "Price must be greater than 0" });
        }

        if (!Number.isFinite(Number(stock)) || Number(stock) < 0) {
            return res.status(400).json({ message: "Stock cannot be negative" });
        }

        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(409).json({ message: "Product with the same name already exists" });
        }

        const product = await Product.create({
            name,
            price: Number(price),
            stock: Number(stock)
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const purchaseProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: "Please provide productId and quantity" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        if (!isPositiveNumber(quantity)) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

        const requestedQuantity = Number(quantity);

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (requestedQuantity > product.stock) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        product.stock -= requestedQuantity;
        await product.save();

        const transaction = await Transaction.create({
            productId: product._id,
            transactionType: "Purchase",
            quantity: requestedQuantity
        });

        res.status(200).json({ message: "Product purchased successfully", product, transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const restockProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: "Please provide productId and quantity" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        if (!isPositiveNumber(quantity)) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

        const restockQuantity = Number(quantity);

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.stock += restockQuantity;
        await product.save();

        const transaction = await Transaction.create({
            productId: product._id,
            transactionType: "Restock",
            quantity: restockQuantity
        });

        res.status(200).json({ message: "Product restocked successfully", product, transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllProductsHistory = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const transactions = await Transaction.find({ productId }).sort({ createdAt: -1 });

        res.status(200).json({ product, transactions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createProduct,
    getProducts,
    purchaseProduct,
    restockProduct,
    getAllProductsHistory
};
