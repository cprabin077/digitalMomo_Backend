const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()



const { registerUser, loginUser } = require("./controller/auth/authController")

//ROUTES HERE
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")


// Routes end here

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


app.use("/api",authRoute)
app.use("/api",productRoute)



const PORT = process.env.PORT
// listen server
app.listen(3000,()=>{
    console.log("server has started at PORT " + PORT)
    //console.log(`server has started at PORT ${PORT} `)
})