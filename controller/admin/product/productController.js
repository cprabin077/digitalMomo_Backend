const Product = require("../../../model/productModel")


exports.createProduct = async (req, res) => {
   
    const file = req.file
    let filePath
    if(!file){
        filePath="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
    }else{
        filePath = req.file.filename
    }
   
    const {productName, productPrice, productDescription, productStatus, productStockQty} = req.body
    if(!productName || !productPrice || !productDescription || !productStatus || !productStockQty ){
        return res.status(400).json({
            message : "Please fill all the boxes"
        })
    }

    // Insert into the Product collection /table

    await Product.create({
        productName,
        productPrice,
        productDescription,
        productStatus,
        productStockQty,
        productImage: "http://localhost:3000/" + filePath
    })

    res.status(200).json({
        message: "Product created successfully"
    })

   
    // console.log(error)
        res.status(500).json({
            message:"something went wrong"
        })
   
}

exports.getProducts = async (req,res)=>{
    const products = await Product.find()
    if(products.length == 0){
        return res.status(400).json({
            message: "No product found",
            products: []
        })
    }
    res.status(200).json({
        message: "Products fetched successfully!!",
        products
    })
}

exports.getProduct = async (req, res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message: "Please provide id(productId"
        })
    }
    const product = await Product.find({_id: id})
    if(product.length ==0){
        return res.status(400).json({
            message: "No product found with that Id",
            product: []
        })
    }
    res.status(200).json({
        message: "Product fetched successfully",
        product
    })

}