import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  const conn = await mongoose.connect(MONGODB_URI);

  if (conn) {
    console.log("Connected to MongoDB Successfully...");
  }
};
connectMongoDB();

app.get("/health", (req, res) => {
  res.send("Status : Ok");
});

const PORT = 3000;

app.post("/product", async (req, res) => {
  //console.log('Product Created');
  const { name, description, price, productImage, brand } = req.body;
  let newProduct = new Product({
    name: name,
    description: description,
    price: price,
    productImage: productImage,
    brand: brand,
  });

  const saveProduct = await newProduct.save();
  res.json({
    status: "Success",
    product: saveProduct,
    message: "New Product created successfully!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
