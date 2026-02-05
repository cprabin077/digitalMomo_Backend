const mongoose = require("mongoose");

exports.connectDatabase = async() =>{

    //connecting to database
    
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected successfully")

}