const {mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true,"please Enter Name"]
    },
    email :{
        type : String,
        unique : true,
        required : [true,"please Enter Email"]
    },
    phone : {
            type :Number,
        unique : true,
        required : [true,"please Enter phone"]
    },
    password :{
        type :String,
        required : [true,"please Enter Password"]
    },
    isAdmin :{
        type :Boolean,
        required:true,
        default: false

    },
    isActive :{
         type :Boolean,
        required:true,
        default: true
    }
},{

    timestamps : true

})

module.exports = mongoose.model('User',userSchema)