const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

// get all products
exports.getProducts = async (req,res)=>{
    const products = await Product.find()
    if(products.length == 0){
        return res.status(400).json({
            message: "No product found",
            data : []
        })
    }
    res.status(200).json({
        message: "Products fetched successfully!!",
        data: products
    })
}

// get a single product
exports.getProduct = async (req, res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message: "Please provide id(productId)"
        })
    }
    const product = await Product.find({_id: id})
    const productReviews = await Review.find({productId : id}).populate("userId")
    if(product.length ==0){
        return res.status(400).json({
            message: "No product found with that Id",
            data:{
                data : [],
                data2: []
            }
        })
    }
    res.status(200).json({
        message: "Product fetched successfully",
        data : {product, productReviews}
    })

}