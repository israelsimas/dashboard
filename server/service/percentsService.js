const percentsData = require('../data/percentsData');

exports.getPercents = async function () {
	return await percentsData.getPercents();
};