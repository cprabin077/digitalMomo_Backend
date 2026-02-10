const User = require("../../../model/userModel")
const bcrypt = require("bcryptjs")

// GET my profile
exports.getMyProfile = async(req, res)=>{
    const userId = req.user.userId
    const myProfile = await User.findById(userId)

    //send  response
    res.status(200).json({
        data: myProfile,
        message: "Profile fetched successfully"
    })
}

// Update my profile 
exports.updateMyProfile = async(req, res) =>{
    const {userName, userPhoneNumber, userEmail} = req.body
    const userId = req.user.id 
    // update profile
    await User.findByIdAndUpdate(userId, {
        userName,
        userEmail, 
        userPhoneNumber
    },{
        runValidators: true,
        new : true
    })
    res.status(200).json({
        message: "Profile updated successfully",
        data: updateData
    })
}


// delete my Profile
exports.deleteMyProfile = async(req, res)=>{
    const userId =req.res.id;
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message: "Profile deleted successfully",
        data: null
    })
}

// update my Password
exports.updateMyPassword = async(req, res)=>{
    const userId = req.user.id
    const {oldPassword, newPassword, confirmPassword} = req.body
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message: "Please fill all th boxes"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message: "New Password and Confirm Password didn't matched"
        })
    }
    // taking out the hash of the old password 
    const userData = await User.findById(userId)
    const hashedOldPassword  = userData.userPassword 


    // check if oldPassword is correct or not
    const isOldPasswordCorrect =  bcrypt.compareSync(oldPassword,hashedOldPassword) // sync vayeko hunale await parena
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message : "OldPassword didn't matched"
        })
    }
    // matched vayo vaney 
    userData.userPassword= bcrypt.hashSync(newPassword,12)
    await userData.save()
    res.status(200).json({
        message  : "Password Changed successfully",
        
    })
}