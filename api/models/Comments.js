const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
     body : {type : String, required : true},
     username : {type :  String, required : true},
     userid : {type : String, required : true},
     parenid : {type : String},
     productid :{type: String}

},{timestamps : true})
module.exports = mongoose.model("Comments", CommentSchema);