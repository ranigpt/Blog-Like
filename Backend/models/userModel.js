const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({

    name :{
        type : String,
        trim : true,
        required : [true , 'First name is Required'],
        maxlength : 13
    },

    email :{
        type : String,
        trim : true,
        required : [true, "email in important"],
        unique : true,
        match :[
            /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3}) + $/,'please add a valid email'
        ]
    },

    password:{
        type: String,
        trim : true,
        required : [true , "Password is required"],
        minlength : [6,'password must have at least (6) charcters']
    },

    role :{
        type : String,
        default :'user'
    }

} , {timestamps:true})



//encypting the password before saving

userSchema.pre('save' , async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10)
})



//compare user password

userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword , this.password)
}


userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this.id} , process.env.JWT_SECRET , {
        expiresIn : 3600
    })
}

module.exports = mongoose.model("User" , userSchema);