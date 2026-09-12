const express = require("express");

const {
    createProduct,
    getProducts,
    purchaseProduct,
    restockProduct,
    getAllProductsHistory,
}= require("../controllers/productController");


const router = express.Router();

router.get("/",getProducts);
router.post("/", createProduct);
router.post("/purchase", purchaseProduct);
router.post("/restock", restockProduct);
router.get("/:productId/history", getAllProductsHistory);


module.exports = router;
