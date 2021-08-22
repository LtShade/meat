const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		default: "",
	},
	poweruser: {
		type: Boolean,
		default: false,
	},
	admin: {
		type: Boolean,
		default: false,
	},
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
