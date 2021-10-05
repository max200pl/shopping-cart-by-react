const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

const MONGODB_URL = "mongodb://127.0.0.1:27017/react-shopping-cart-db";

mongoose.connect(
     MONGODB_URL,
     async (err) =>
     {
          if (err) throw err;
          console.log("connected to db")
     }
)
const Product = mongoose.model("products", new mongoose.Schema({
     _id: { type: String, default: shortid.generate },
     title: String,
     description: String,
     image: String,
     price: Number,
     availableSizes: [String],
}))

app.get("/api/products", async (req, res) =>
{
     const products = await Product.find({});
     res.send(products);
})

app.post("/api/products", async (req, res) =>
{
     const newProduct = new Product(req.body)
     const savedProduct = await newProduct.save();
     res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) =>
{
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
     res.send(deletedProduct)
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"))