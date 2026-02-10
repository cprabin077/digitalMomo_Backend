const User = require("../../../model/userModel")

// GET Users
exports.getUsers = async (req, res) =>{
    const userId = req.user.id
    const users = await User.find({_id : {$ne: userId}}).select(["+otp","+isOtpVerified","-__v"]) // ne : not equal 
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

// Delete user API
exports.deleteUser = async (req, res)=>{
    const userId = req.params.id
    if(!userId){
        return res.status(400).json({
            message: "Please provide user Id"
        })
    }
    // check if that userUd exists or not
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({
            message: "User not found with that userId"
        })
    }
    await User.findByIdAndDelete(userId)
    res.status(200).json({
     message: "User deleted successfully"   
    })
}
