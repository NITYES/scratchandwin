const mongoose=require('mongoose');


const loggedStatusSchema=new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    token:{
        type:String,
        required:true
    },
    isLogged:Boolean
})

module.exports=mongoose.model('LoggedStatus',loggedStatusSchema)