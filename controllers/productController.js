const Product = require("../models/productModel");
const Transaction = require("../models/Transaction");

const createProduct = async (req, res) => {
    try {
        const{name,price,stock}= req.body;
        if(!name || price === undefined || stock === undefined){
            return res.status(400).json({message: "Please provide all required fields"});
    }

    if(stock <0){
        return res.status(400).json({message: "Stock cannot be negative"});
    }

    const existingProduct = await Product.findOne({name});

    if(existingProduct){
        return res.status(409).json({message: "Product with the same name already exists"});
    }

 const product = await Product.create({name,price,stock});
 res.status(201).json(product);
}

catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
}
};


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1});
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

        if (quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

      if (quantity > product.stock){
          return res.status(400).json({message: "Insufficient stock"});
      }

      product.stock -= quantity;
      await product.save();

        const transaction = await Transaction.create({
            productId: product._id,type: "Purchase",quantity
        });

        res.status(200).json({ message: "Product purchased successfully",product, transaction });

        res.status(200).json({ message: "Product purchased successfully", product, transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    
    }
};


    
    