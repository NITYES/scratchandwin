const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const crypto=require('crypto');
const Token=require('../../models/token')
const jwt = require("jsonwebtoken");
const AuthStatus = require("../../models/authStatus");
const sendEmail=require('../../middleware/email')

const { updateLoggedStatus } = require("../../middleware/helperfunction");
module.exports.createUser = async (req, res) => {
  //1. check whether email is present or not
  let user = await User.findOne({ email: req.body.email }).exec();

  //2 if present send message
  if (user) {
    return res.status(400).json({
      error: "User Already Registered with email",
    });
  }

  //if user not present in the database
  //add retailer role
  req.body.role = "retailer";
  try {
    //create new user and save to the database
    new User(req.body).save((error, user) => {
      if (error) return res.status(400).json({ error: error.message });
      console.log(user);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        shop: user.shop,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.saveColor = async (req, res) => {
  console.log(req.user, req.body);
  User.findOneAndUpdate(
    { _id: req.user._id },
    { color: req.body.color },
    { new: true }
  ).exec((err, user) => {
    if (err) res.status(401).json({ error: "Color not saved" });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        shop: user.shop,
        color: user.color,
      });
    }
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  //check user exist with the email id or not
  const user = await User.findOne({ email }).exec();
  if (user) {
    //check password is correct or not
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //create a token for authenticated user
      const payload = {
        _id: user.id,
        role: user.role,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1day" },
        async (err, token) => {
          if (err) return res.status(401).json({ error: "Please try later" });

          //update logged status
          await updateLoggedStatus(user._id, token, true);
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token,
            address: user.address,
            role: user.role,
            shop: user.shop,
            color: user.color,
          });
        }
      );
    } else {
      return res.status(401).json({
        error: "Invalid Password or email",
      });
    }
  } else {
    return res.status(401).json({
      error: "Email  doesnot exist",
    });
  }
};

module.exports.authenticateUser = async (req, res) => {
  const user = await User.findOne({ _id: req._id }).exec();
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      shop: user.shop,
      color: user.color,
    });
  }
};

module.exports.authenticateAdmin = async (req, res) => {
  const user = await User.findOne({ _id: req._id }).exec();
  if (user) {
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
};

module.exports.logout = (req, res) => {
  const token = req.headers.authtoken;
  AuthStatus.deleteOne({ token: token }, function (err) {
    if (err) {
      return console.log(err);
    } else {
      res.status(200).json({
        message: "Logout Success",
      });
    }
  });
};


module.exports.resetPasswordRequest=async (req,res,next)=>{
console.log(req.body)
  const email=req.body.email;
  const user=await User.findOne({email:"thewiseowl02@gmail.com"});
  if(!user){
    return res.status(401).json({
      error:"User do not exist !"
    })
  }
let token=await Token.findOne({userId:user._id});
if(token)token.deleteOne();
let resetToken=crypto.randomBytes(32).toString("hex");
const hash=await bcrypt.hash(resetToken,Number(process.env.BCRYPT_SALT));

await new Token({
  userId:user._id,
  token:hash,
  createdAt:Date.now()
}).save()

const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
const htmlTemplate=`<html>
<head>
    <style>
    </style>
</head>
<body>
    <p>Hi ${user.name},</p>
    <p>You requested to reset your password.</p>
    <p> Please, click the link below to reset your password</p>
    <a href="https://${link}">Reset Password</a>
</body>
</html>`
await sendEmail(user.email,"Password Reset Request",htmlTemplate);
return link;

}

module.exports.resetPassword=(req,res,next)=>{
  
}