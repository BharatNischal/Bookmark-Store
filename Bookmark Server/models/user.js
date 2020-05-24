var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    bookmarks:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "bookmark"
      }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);
