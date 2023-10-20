import { Schema,model } from "mongoose";

const productSchema = new Schema({
    name:String,
    price:{type:Number},
    description:String,
    price:{type:Number},
    productImage:String,
    brand:String

    
})