const restrictTo = (...roles) =>{
    return (req, res, next) =>{
       const userRole = req.user.role
       console.log(userRole)
      // console.log(roles)
       if(!roles.includes(userRole)){
        return res.status(403).json({
            message: "You don't have permission"
        })
       }
       next()
        }
    } 

module.exports = restrictTo