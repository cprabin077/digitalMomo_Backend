const express = require("express")
const { connectDatabase } = require("./database/database")
const app = express()



const { registerUser, loginUser } = require("./controller/auth/authController")

//ROUTES HERE
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const adminUsersRoute = require("./routes/adminUsersRoute")
const userReviewRoute = require("./routes/userReviewRoute")


// Routes end here

//TELL NODE TO USE  DOTENV
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

// requesting nodejs to give access to uploads folder
app.use(express.static("./uploads"))

//DATABASE CONNECTION
connectDatabase(process.env.MONGO_URI)

// test api to check if server is alive or not
app.get("/",(req,res)=>{
    res.status(200).json({
        //status:200,
        message:"I am alive"
    })
})


app.use("/api",authRoute)
app.use("/api",productRoute)
app.use("/api", adminUsersRoute)
app.use("/api",userReviewRoute)



const PORT = process.env.PORT
// listen server
app.listen(3000,()=>{
    console.log("server has started at PORT " + PORT)
    //console.log(`server has started at PORT ${PORT} `)
})