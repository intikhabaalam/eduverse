const jwt = require('jsonwebtoken')
const User = require("../models/userModel")


const adminProtect = async ( req,res,next)=>{


   let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

      try {
    token = req.headers.authorization.split(" ")[1]
     let decoded = jwt.verify(token,process.env.JWT_SECRET)
     let user = await User.findById(decoded.id).select('-password')

     if(!user){
        res.status(401)
        throw new Error ('Unauthorsed access')
     }
      
   req.user = user
   if(user.isAdmin){
    req.user = user
     next()
   }else{
    res.status(401)
    throw new Error('Unauthored access : Adim Only')
   }
    
    
    
   } catch (error) {
          res.status(400)
          throw new Error('Unathorized access')   
   }

  }else{
     res.status(400)
     throw new Error('Unathorized access')
  }
}

module.exports = adminProtect