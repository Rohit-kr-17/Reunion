const House = require("../models/houses.js");
const { uploadImageToCloud } = require("../utils/helper.js");
const { ObjectId } = require("mongodb");
exports.createProperty = async (req, res) => {
	try {
		const { name, price, location, propertyType, date, beds, bathrooms } =
			req.body;
		const { file } = req;
		const user = req.user;
		const data = {
			name: name,
			price: price,
			location: location,
			date: date,
			beds: beds,
			bathrooms: bathrooms,
			propertyType: propertyType,
			user,
		};

		const newProperty = new House(data);
		if (file) {
			const { url, public_id } = await uploadImageToCloud(file.path);
			newProperty.image = { url, public_id };
		}
		await newProperty.save();
		res.status(200).send({
			success: true,
			message: "product added successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			success: false,
			message: "Server Error",
		});
	}
};
exports.getProperty = async (req, res) => {
	try {
		const property = await House.find();
		res.status(200).send({
			success: true,
			property,
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			success: false,
			message: "Error while Fetching Products",
			error,
		});
	}
};

exports.filteredProperties = async (req, res) => {
	try {
		const { location, Price, dateOfAvailability, propertyType } = req.query;
		console.log(req.params);

		const query = {};

		if (location) query.location = { $regex: new RegExp(`^${location}$`, "i") };
		if (Price) query.price = { $gte: parseFloat(Price) };
		if (propertyType)
			query.propertyType = { $regex: new RegExp(`^${propertyType}$`, "i") };
		if (dateOfAvailability) query.date = { $gte: dateOfAvailability };

		const filteredProperties = await House.find(query);
		res.json(filteredProperties);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
exports.getPropertyById = async (req, res) => {
	try {
		const user = req.user.id;
		const result = await House.find({ user: user });
		console.log(result);
		res.status(200).send({ property: result });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
exports.deleteProperty = async (req, res) => {
	try {
		const PropertyId = req.params.pId;
		const property = await House.findById(PropertyId);
		if (!property) return res.json({ error: "Invalid request" });
		if (property.user != req.user.id)
			return res.json({ error: "Unauthorized request" });
		await House.findByIdAndDelete(PropertyId);
		return res.json({ message: "Property deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
exports.updateProperty = async (req, res) => {
	try {
		const { name, price, location, date, beds, bathrooms } = req.body;
		const { file } = req;
		const user = req.user;
		const PropertyExists = await House.findById(req.params.pId);
		if (!PropertyExists) {
			return res.status(404).send({
				success: false,
				message: "Property not found",
			});
		}
		if (user.id != PropertyExists.user) {
			return res.status(500).send({
				success: false,
				message: "Invalid Access",
			});
		}

		PropertyExists.name = name !== undefined ? name : PropertyExists.name;
		console.log(name, PropertyExists.name);
		PropertyExists.price = price !== undefined ? price : PropertyExists.price;
		PropertyExists.location =
			location !== undefined ? location : PropertyExists.location;
		PropertyExists.date = date !== undefined ? date : PropertyExists.date;
		PropertyExists.propertyType.beds =
			beds !== undefined ? beds : PropertyExists.propertyType.beds;
		PropertyExists.propertyType.bathrooms =
			bathrooms !== undefined
				? bathrooms
				: PropertyExists.propertyType.bathrooms;

		if (file) {
			const { url, public_id } = await uploadImageToCloud(file.path);
			PropertyExists.image = { url, public_id };
		}
		await PropertyExists.save();
		res.status(200).send({
			success: true,
			message: "Property updated Successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			success: false,
			message: "Server Error",
		});
	}
};
