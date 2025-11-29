const User = require('../models/userModel')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


const registerUser = async(req,res)=>{

  let{name,email,phone,password} = req.body

  if(!name||!email||!phone||!password){
    res.status(400)
    throw new Error ("Please Fill All Details")
  }
   // check if user already exists

   let emailExist = await User.findOne({email:email})
   let phoneExist = await User.findOne({phone:phone})

   if(emailExist || phoneExist){
       res.status(400)
       throw new Error('User Already Exist')
   }

   //check if phone number is valid
   if(phone.length !== 10){
    res.status(400)
    throw new Error('Please Enter Valid Phone Number')
   } 

   //Hash Password
   let salt = await bcrypt.genSalt(10)
   let hashedPassword = await bcrypt.hash(password,salt)

   //create user
   let user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
   })

   

   if(!user){
    res.status(400)
    throw new Error('User Not Created')
   }
  res.status(201).json({

     _id : user._id,
     name : user.name,
     email : user.email,
     phone : user.phone,
     isActive : user.isActive,
     isAdmin : user.isAdmin,
     createdAt : user.createdAt,
    token : generateToken(user._id)


     })



}

const loginUser = async(req,res)=>{
   let {email,password} = req.body
   if(!email || !password){
    res.status(400)
    throw new Error('Plaese Fill All Details')
   }

 const user = await User.findOne({email})

 if(user && await bcrypt.compare(password,user.password)){
      if(user.isActive){
            res.status(200).json({

     _id : user._id,
     name : user.name,
     email : user.email,
     phone : user.phone,
     isActive : user.isActive,
     isAdmin : user.isAdmin,
     createdAt : user.createdAt,
     token : generateToken(user._id)


     })
      }else{

      res.status(401)
      throw new Error('Acount Disabled!')

      }

 }else{
   res.status(401)
   throw new Error('Invalid credentials')
 }

}

const privateController = async(req,res)=>{
  console.log(req.user)
  res.json({
    msg : " I am Private Route On LOggedin User Can Access Me"
  })
}

 //Generate Token

 const generateToken = (id)=>{

  let token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'15d'})
  return token
 }



module.exports = {registerUser,loginUser,privateController}