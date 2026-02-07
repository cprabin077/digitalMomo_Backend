const mongoose = require("mongoose");
const User = require("../model/userModel");
const adminSeeder = require("../adminSeeder");

exports.connectDatabase = async() =>{

    // connecting to database
    
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected successfully")

    //admin seeding function
    adminSeeder()
    
}