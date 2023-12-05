const mongoose = require("mongoose");

const houseSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
		},
		image: {
			type: Object,
			url: String,
			public_id: String,
			required: true,
		},
		location: {
			type: String,
			trim: true,
			required: true,
		},
		date: {
			type: Date,
			default: () => new Date().setUTCHours(0, 0, 0, 0),
		},
		propertyType: {
			type: String,
			trim: true,
			required: true,
		},
		beds: {
			type: Number,
			default: 0,
		},
		bathrooms: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("House", houseSchema);
