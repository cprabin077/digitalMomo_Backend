const Product = require("../../../model/productModel")


exports.createProduct = async (req, res) => {
    
    const {productName, productPrice, productDescription, productStatus, productStockQty} = req.body
    if(!productName || !productPrice || !productDescription || !productStatus || !productStockQty){
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
        productStockQty
    })

    res.status(200).json({
        message: "Product created successfully"
    })

}