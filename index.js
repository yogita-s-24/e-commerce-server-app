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
    brand: brand
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
app.get('/product',async(req,res)=>{

    const {name} = req.query;

    const product = await Product.findOne({name:name})

    res.json({
        status:'success',
        data:product,
        message:"Products fetched Successfully"

    })
})

//get all products
app.get('/products', async(req,res)=>{
    const products = await Product.find()
    res.json({
        status:'success',
        data:products,
        message:"All Products Fetched Successfully"
        })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
