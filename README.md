# Inventory Management System

REST API to manage product inventory using Node.js, Express.js, MongoDB, and Mongoose.

## Features

- Create products with unique names
- Get all products
- Purchase products and reduce available stock
- Restock products and increase available stock
- Store purchase/restock transaction history
- Validate product price, stock, quantity, and product ID

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file using `.env.example`.

3. Start the server:

```bash
npm run dev
```

On Windows PowerShell, use:

```bash
npm.cmd run dev
```

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

If your local antivirus or network tool causes a MongoDB TLS certificate error during development, you can add:

```env
MONGO_TLS_ALLOW_INVALID_CERTIFICATES=true
```

## API Endpoints

### Health Check

`GET /`

### Create Product

`POST /products`

```json
{
  "name": "Laptop",
  "price": 50000,
  "stock": 10
}
```

### Get Products

`GET /products`

### Purchase Product

`POST /products/purchase`

```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Restock Product

`POST /products/restock`

```json
{
  "productId": "product_id_here",
  "quantity": 5
}
```

### Product Transaction History

`GET /products/:productId/history`

## Business Rules

- Product name must be unique.
- Product price must be greater than zero.
- Product stock cannot be negative.
- Purchase quantity must be greater than zero.
- Restock quantity must be greater than zero.
- Purchase is not allowed if requested quantity exceeds available stock.
- Every successful purchase creates a transaction record.
- Every successful restock creates a transaction record.
