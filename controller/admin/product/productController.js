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

    //insert into the Product collection /table

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

}