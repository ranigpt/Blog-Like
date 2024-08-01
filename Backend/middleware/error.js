const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err , req , res , next) =>{

    let error = {...err};
    error.message = err.message;

    if(err.name === "CastError"){
        const message = `Ressource not found ${err.value}`;
        error = new ErrorResponse(message , 404);

    }

    if(err.code === 11000){
        const message = "Duplicate field value Entered";
        error = new ErrorResponse(message , 400);
    }

    //validation error

    if(err.name === "validationError"){
        const message = Object.values(err.errors).map(val=> ' '+val.message);
        error = new ErrorResponse(message,400)
    }
}

module.exports = errorHandler;