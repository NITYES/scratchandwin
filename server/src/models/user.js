const mongoose=require('mongoose');
const schema=mongoose.Schema
const bcrypt=require('bcryptjs');
const BCRYPT_SALT=process.env.BCRYPT_SALT

const userSchema=new schema({
    name:{
        type:String,
         required:true,
         trim: true,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        unique: true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["retailer","admin"]
    },
    address:{type:String,
        trim: true,
        },
    shop:{type:String},
    color:{
        type:String,
        default:'green'
    }
    
   

},{timestamps:true});


userSchema.pre("save", async function (next){

    if (!this.isModified("password")) {
        return next();
      }
    const hash = await bcrypt.hash(this.password, Number(BCRYPT_SALT));
    this.password = hash;
    next();
  });


module.exports=mongoose.model('User',userSchema)
