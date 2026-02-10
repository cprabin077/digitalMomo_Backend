const Product = require("../../model/productModel")
const Review = require("../../model/reviewModel")

exports.createReview = async(req, res) =>{
    const userId = req.user.id
    const {ratingBar, message} = req.body
    const productId = req.params.id
    if(!ratingBar || !message || !productId){
        return res.status(400).json({
            message: "Please provide rating bar, message and productId"
        })
    }
    //check if that productId product exists or not
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message: "Product with that productId does not exist"
        })
    }
    // Insert them into review
    await Review.create({
        userId,
        productId,
        ratingBar,
        message
    })
    res.status(200).json({
        message: "Review added successfully"
    })
}

// GET product review
exports.getProductReview = async(req, res)=>{
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message: " Please provide productId"
        })
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message: "Product with that id does not exist"
        })
    }
    const reviews = await Review.find({productId}).populate("userId")
    res.status(200).json({
        message: "Review fetched successfully",
        data: reviews
    })
}


// //Check ParamId
// exports.checkParamsId = (res, checkParam, id) =>{
//     return res.status(400).json({
//         message: `Please provide id  ${id}`
//     })
// }

// Delete Review 
exports.deleteReview = async(req, res)=>{
    const reviewId =  req.params.id
    this.checkParamsId(res,"ReviewId")
    if(!reviewId){
        return res.status(400).json({
            message: "Please provide reviewId"
        })
    }
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message: "Review deleted successfully"
    })
}