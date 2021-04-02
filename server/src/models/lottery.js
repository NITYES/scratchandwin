const mongoose=require("mongoose");


const prizeSchema=new mongoose.Schema({
    public_id:{
        type:String
    },
    imageUrl:String,
    quantity:{
        type:Number,

    },
    won:{
        type:Number,
        default:0
    },
    remaining:{
        type:Number,
    },
    name:{
        type:String
    }
})

const lotterySchema=new mongoose.Schema({

    retailerId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    prize:[prizeSchema],
    totalPrize:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
    frequency:{
        type:Number,
    },
    timeDifference:Number,
    coverImage:{
        public_id:String,
        imageUrl:String
    },
    nextTimeImage:{
        public_id:String,
        imageUrl:String
    }
})



module.exports=mongoose.model('Lottery',lotterySchema)