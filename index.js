import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "./src/models/product.js";

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

//schema
// const productSchema = new Schema({
//     name:String,
//     price:Number,
//     description:String,
//     price:Number,
//     productImage:String,
//     brand:String

// });

//model
// const Product = model('Product', productSchema);

app.get("/health", (req, res) => {
  res.send("Status : Ok");
});

const PORT = 3000;

app.post("/product", async (req, res) => {
  //console.log('Product Created');
  const { name, description, price, productImage, brand } = req.body;

  // Create a new Product instance with the extracted data
  let newProduct = new Product({
    name: name,
    description: description,
    price: price,
    productImage: productImage,
    brand: brand,
  });

  // Save the new product to the database
  const saveProduct = await newProduct.save();

  // Respond with a success message and the saved product data
  res.json({
    status: "Success",
    product: saveProduct,
    message: "New Product created successfully!",
  });
});

//get products using name
app.get("/product", async (req, res) => {
  const { name } = req.query;

  const product = await Product.findOne({ name: name });

  res.json({
    status: "success",
    data: product,
    message: "Products fetched Successfully",
  });
});

//get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json({
    status: "success",
    data: products,
    message: "All Products Fetched Successfully",
  });
});

//delete api for delete student from db
app.delete("/product/:_id", async (req, res) => {
  const { _id } = req.params;

  await Product.deleteOne({ _id: _id });

  res.json({
    status: "success",
    message: `Deleted ${_id}`,
  });
});

//update api for update product from db using 'put method
//put

app.put("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, productImage, brand } = req.body;

  await Product.updateOne(
    { _id: _id },
    {
      $set: {
        name: name,
        description: description,
        price: price,
        productImage: productImage,
        brand: brand,
      },
    } // find the document with this id
  );
  const findProduct = await Product.findOne({ _id: _id });

  res.json({
    status: "success",
    data: findProduct,
    message: "Updated Successfully",
  });
});

//patch

app.patch("/product/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, description, price, productImage, brand } = req.body;

  const product = await Product.findById(_id);

  if (name) {
    product.name = name;
  }

  if (description) {
    product.description = description;
  }
  if (price) {
    product.price = price;
  }
  if (productImage) {
    product.productImage = productImage;
  }
  if (brand) {
    product.brand = brand;
  }

  const updateSpecificData = await product.save();

  res.json({
    status: "success",
    data: updateSpecificData,
    message: "Update Successful",
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
