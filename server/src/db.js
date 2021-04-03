const mongoose = require("mongoose");
let MONGODB_URL =
  process.env.NODE_ENV === "PRODUCTION"
    ? `mongodb+srv://wiseowl:${process.env.MONGO_DB_PASSWORD}@customerinformation.x9ecw.mongodb.net/SCRATCHANDWIN?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/scratchandwin";

module.exports = function connection(){
  try {
    mongoose.connect(
      MONGODB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
      },   
      (error) => {
        if (error) console.log(error);
        console.log("connected to the database");
      }
    );
  } catch (error) {
    console.log(error);
  }
};
