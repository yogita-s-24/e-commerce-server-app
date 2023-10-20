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



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
