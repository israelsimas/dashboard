const Coordinate = require("../models/coordinates");

exports.getCoordinates = async (req, res) => {
	try {
		const coordinates = await Coordinate.find();
		return coordinates;
	} catch (err) {
		return { message: err };
	}
  };
