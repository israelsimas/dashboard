const mongoose = require("mongoose")

const schema = mongoose.Schema({
	resolved: Number,
    opened: Number,
    unsolved: Number,
})

module.exports = mongoose.model("percents", schema);