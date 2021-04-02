const cloudinary=require('cloudinary');
const utils=require("util");




cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



module.exports.uploadImage= async (req,res,next)=>{

  try {
      
    let result =await cloudinary.uploader.upload(req.body.image,{
        public_id:`${Date.now()}`,
        resource_type:'auto'  //jpeg ,png
    });
    
    res.json({
        public_id:result.public_id,
        imageUrl:result.secure_url,
        quantity:1,
        won:0,
        remaining:1,
        name:""
    })
  } catch (error) {
      
    // utils.con
      res.status(501).json({
          error:"Error Uploading The Image"
      })
  }
}