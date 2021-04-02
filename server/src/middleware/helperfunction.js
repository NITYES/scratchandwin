const LoggedStatus = require("../models/authStatus");
const jwt = require("jsonwebtoken");

module.exports.checkTokenAndLoggedStatus = async (req, res, next) => {

  const token=req.headers.authtoken
  try {
    const decoded = await jwt.verify(
      req.headers.authtoken,
      process.env.JWT_SECRET_KEY
    );

    if (decoded) {
//for more security concern check the user status by _id as well by token

      const user = await LoggedStatus.findOne({ token:token }).exec();

      if (user&&user.isLogged){

        console.log(user.isLogged);
        req.user = decoded;
        req._id = decoded._id;
        next();
      } else {
        return res.status(401);
      }
    } else {
      res.status(401);
    }
  } catch (error) {

    
    console.log("token is invalid----->", error.message);
    res.status(401).send("Invalid Token");


  }
};

module.exports.updateLoggedStatus = async (id, token, bool) => {
  const login = new LoggedStatus({
    userId: id,
    isLogged: bool,
    token: token,
  });

  login.save((err, obj) => {
    if (err) return false;
    return true;
  });
};

module.exports.getDifference = (endDate, startDate) => {
  let difference_ms = new Date(endDate) - new Date(startDate);
  difference_ms = difference_ms / 1000;
  var seconds = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var hours = Math.floor(difference_ms % 24);
  var days = Math.floor(difference_ms / 24);
  return days;
};


module.exports.getTimeRemaining=(endDate)=>{

  const end=new Date(endDate).getTime();
  const today=new Date().getTime();

  const difference=end-today
  return difference


}