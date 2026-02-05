const express = require("express")
const { connectDatabase } = require("./database/database")
const User = require("./model/userModel")
const app = express()


const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//TELL NODE TO USE  DOTENV
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//DATABASE CONNECTION
connectDatabase()

// test api to check if server is alive or not
app.get("/",(req,res)=>{
    res.status(200).json({
        //status:200,
        message:"I am alive"
    })
})

// register user api
app.post("/register",async (req,res)=>{
    const {email, username, password, phoneNumber} = req.body
    if(!email || !username || !password || !phoneNumber){
       return res.status(400).json({
            message : "Please provide email, password, phoneNumber"
        })
    }
    // check if that email user already exists or not
    const userFound = await User.find({userEmail: email})
    if(userFound.length > 0){
        return res.status(400).json({
            message:"This email is already registered!!"
        })
    }

    // else 
     await User.create({
        userName: username,
        userPhoneNumber: phoneNumber,
        userEmail: email,
        userPassword: bcrypt.hashSync(password,10)
    })
    res.status(201).json({
        message : "User registered successfully!!"
    })
})

//LOGIN USER API
app.post("/login", async (req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message:"Please provide email, password"
        })
    }

    // check if that email user exists or not
    const userFound = await User.find({userEmail: email})
    if(userFound.length == 0){
        return res.status(404).json({
            message: "This email is not registered"
        })
    }

    // check password
    const isMatched = await bcrypt.compareSync(password, userFound[0].userPassword)
    if(isMatched){

        //generate token
        const token = jwt.sign({id: userFound[0]._id},process.env.SECRET_KEY,{
            expiresIn : '30d'
        })

        return res.status(200).json({
            message : "User logged in successfully",
            token
        })    
    }
    res.status(404).json({
        message: "Invalid Email or Password"
    })
})

const PORT = process.env.PORT
// listen server
app.listen(3000,()=>{
    console.log("server has started at PORT " + PORT)
    //console.log(`server has started at PORT ${PORT} `)
})