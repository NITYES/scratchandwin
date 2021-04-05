const user = require("../models/user")

module.exports.isAdmin=async (req,res,next)=>{


if(req.user.role=="admin"){
    next();
}else{
    res.status(401).json({
        error:"Admin Restricted Area"
    })
}

}


module.exports.isRetailer=async (req,res,next)=>{

    
    if(req.user.role=="retailer"){
        next();
    }else{
        res.status(401).json({
            error:"Retailer Restricted Area"
        })
    }
    
    }