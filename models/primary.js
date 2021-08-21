const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const primarySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true, strict: false }
);

const Primary = mongoose.model("Primary", primarySchema);
module.exports = Primary;
