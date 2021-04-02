const bodyParser = require('body-parser');
const express=require('express');
require("dotenv").config();
const connection=require('./db')
const morgan=require('morgan')
const cors=require('cors');

//import routes
const UserAuthRoute=require('./routes/user/auth');
const RetailerRoute=require('./routes/retailers/retailer')

//database connection...
connection();

const app=express();

//middleware
app.use(morgan('dev'));
app.use(cors());
//1. to parse json 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit:"2mb"}));

//routes
app.get('/',(req,res)=>{
    res.send('i am from root api');
})


app.use('/api',UserAuthRoute)
app.use('/api',RetailerRoute)

app.use(function(err,req,res,next){

     console.log(err.message)
    console.log("i am error handler");
    res.status(400).json({
        error:"Bad request"
    })
})

const PORT=process.env.PORT || 4000
app.listen(PORT,(error)=>{
    if(error) console.log(error)
    console.log(`Server started running on port ${PORT}`)

})
