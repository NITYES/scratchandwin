const mongoose=require("mongoose");

//custom validation for arary
var notEmpty = function(purchasedItems){
    console.log("non empty array middleware",purchasedItems)
    if(purchasedItems.length === 0){return false}
    else {return true};
}

const customerSchema=new mongoose.Schema({

retailerId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"User"
},
customerName:{
    type:String,
    required:true,
    trim:true,
    lowerCase:true,
    maxLength:[100,"Name is Too long"]
},
customerMobile:{
    type:String,
    minLength:10,
    maxLength:10,
    trim:true,
    required:true

},
customerEmail:{
    type:String
},
purchasedItems:[
    {
        type:String,
    validate:[notEmpty,"Please add at least one purchased Product"]

    }
    
],
totalPurchase:{
    type:Number,
    required:true
},
shopName:{
    type:String
},
prize:{}


})



module.exports=mongoose.model('Customer',customerSchema)