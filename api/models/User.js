const mongoose = require("mongoose");
// required bat buoc phai co
//unique ko duoc trung
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img : {type : String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);