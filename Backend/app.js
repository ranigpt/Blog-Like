const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const morgan = require("morgan");
var cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");

const authRoutes = require('./routes/authRoutes');


mongoose.connect(process.env.DATABASE,{
   
})
.then(()=>{
    console.log("DB connected")
})
.catch((err)=> console.log(err));


//middleware

app.use(morgan('dev'));
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended : true
}));
app.use(cookieParser());
app.use(cors());

//Routes middleware
app.use('/api' , authRoutes);

//error middleware

app.use(errorHandler);

const port =  3000

app.listen(port , ()=>{
    console.log("listing at 9000");
})