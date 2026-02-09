const User = require("../../../model/userModel")

// GET Users
exports.getUsers = async (req, res) =>{
    const users = await User.find().select(["+otp","+isOtpVerified","-__v"])
    if(users.length > 1){
        return res.status(200).json({
            message: "Users fetched successfully",
            data: users
        })
    }
    res.status(404).json({
        message: "User collection is empty",
        data: []
    })
}