const user = require("../models/user")

module.exports.isAdmin=async (req,res,next)=>{

console.log(req.user)

if(req.user.role=="admin"){
    next();
}else{
    res.status(401).json({
        error:"Aminn Restricted Area"
    })
}

}


module.exports.isRetailer=async (req,res,next)=>{

    console.log(req.user)
    
    if(req.user.role=="retailer"){
        next();
    }else{
        res.status(401).json({
            error:"Retailer Restricted Area"
        })
    }
    
    }