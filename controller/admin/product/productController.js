const Product = require("../../../model/productModel")
const fs = require("fs")

// create product
exports.createProduct = async (req, res) => {
    
    // uploading files
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
        productImage: process.env.BACKEND_URL + filePath
    })

    res.status(200).json({
        message: "Product created successfully"
    })

   
    // console.log(error)
        res.status(500).json({
            message:"something went wrong"
        })
   
}

// get all products
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

// get a single product
exports.getProduct = async (req, res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message: "Please provide id(productId)"
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

// DELETE product
exports.deleteProduct = async (req, res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message: "PLease provide id"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(400).json({
            message: "No data found with that id"
        })
    }

    const oldProductImage = oldData.productImage // "http://localhost:3000/1770611954067-ri_ya-coffee-6632524_1920.jpg"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // 1770611954067-ri_ya-coffee-6632524_1920.jpg
    if(req.file && req.file.filename){

        // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    }
    
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message: "Product deleted successfully"
    })
}


// UPDATE Product
exports.updateProduct = async(req,res)=>{

    const {id} = req.params 
      const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body
      if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
        return res.status(400).json({
            message : "Please fill all the boxes"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
 
    const oldProductImage = oldData.productImage // "http://localhost:3000/1770611954067-ri_ya-coffee-6632524_1920.jpg"
    const lengthToCut  = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut) // 1770611954067-ri_ya-coffee-6632524_1920.jpg
    if(req.file && req.file.filename){
        // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  finalFilePathAfterCut,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    }
   const datas =  await Product.findByIdAndUpdate(id,{
        productName ,
        productDescription ,
        productPrice,
        productStatus,
        productStockQty,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL +  req.file.filename :  oldProductImage
    },{
        new : true,
    
    })
    res.status(200).json({
        messagee : "Product updated successfully",
        data : datas
    })
}