const nodemailer=require('nodemailer');
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");



const sendEmail=async (email,subject,template)=>{
    console.log("i am send email functions..")

try {
    
//create re-useable transporter object using the default SMT transport

const transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:process.env.EMAIL_USERNAME,
        pass:process.env.EMAIL_PASSWORD
    },
    tls:{
        rejectUnAuthorised:false
    }
})
//set option
const options=()=>{
    return {
        from:process.env.FROM_EMAIL,
        to:email,
        subject:subject,
        html:template
    }
}
//send email
transporter.sendMail(options(),(error,info)=>{
    if(error){
        console.log(error)
        return error;
    }else{
        console.log(info)
        return res.status(200).json({
            success:true
        })
    }
})


} catch (error) {
    console.log(error)
    return error
}


}


module.exports=sendEmail