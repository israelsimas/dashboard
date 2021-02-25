const coordinatesData = require('../data/coordinatesData');

exports.getCoordinates = async function () {
	return await coordinatesData.getCoordinates();
};