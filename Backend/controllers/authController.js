const User = require('../models/userModel');

const ErrorResponse = require("../utils/errorResponse");

exports.signup = async(req , res , next)=>{

    const {email} = req.body;

    const userExits = await User.findOne({email});

    if(userExits) {
        return next(new ErrorResponse("E-mail already registered" , 404));
    }

    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success : true,
            user
        })
    } catch(error){
        next(error);
    }
}