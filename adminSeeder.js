const User = require("./model/userModel")
const bcrypt = require("bcryptjs")

const adminSeeder = async () =>{
    // ADMIN seeding

    //check whether admin exists or not
    const isAdminExists = await User.findOne({userEmail: "admin@gmail.com"})
   // console.log(isAdminExists)

    if(!isAdminExists){
        return await User.create({
            userEmail: "admin@gmail.com",
            userPassword: bcrypt.hashSync("admin",10),
            userPhoneNumber: "9840392019",
            userName: "admin",
            role: "admin"
        })
        console.log("Admin seeded successfully!!")
    }
    console.log("Admin already seeded!!")
}

module.exports = adminSeeder