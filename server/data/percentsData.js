const Percent = require("../models/percents");

exports.getPercents = async (req, res) => {
	try {
		const percents = await Percent.find();
		return percents;
	} catch (err) {
		return { message: err };
	}
  };
