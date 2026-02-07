const mongoose= require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName : {
        type: String,
        required: [true, "Name must be required"]
    },
     productPrice: {
        type: Number,
        required: [true, "Price should be required"]
     },
     productDescription: {
        type: String,
        required: [true, "Description should be required"]
     },
     productStockQty: {
        type: Number,
        required: [true, "Quantity should be required"]
     },
     productStatus: {
        type: String,
        enum: ["available","unavailable"]
     },
},
   {
      timestamps: true
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product