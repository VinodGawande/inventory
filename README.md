Inventory Management System

This project is a simple backend API for managing product stock. It allows you to create products, view products, purchase items, restock items, and check product history.

Technologies used

Node.js
Express.js
MongoDB
Mongoose

How to run the project

1. Open the project folder in the terminal.
2. Run this command:

npm install

3. Create a .env file in the project root.
4. Add your MongoDB connection string and port.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string

5. Start the server:

npm run dev

If you are using Windows PowerShell, you can also run:

npm.cmd run dev

Main API endpoints

GET /
This checks if the server is running.

POST /products
This creates a new product.

GET /products
This shows all products.

POST /products/purchase
This reduces stock after a purchase.

POST /products/restock
This increases stock after a restock.

GET /products/:productId/history
This shows all transaction records for one product.

Rules for the project

Product name must be unique.
Price must be greater than zero.
Stock cannot be negative.
Purchase quantity must be greater than zero.
Restock quantity must be greater than zero.
You cannot purchase more than the available stock.
Every successful purchase and restock is saved in the transaction table.


