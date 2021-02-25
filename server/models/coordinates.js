const mongoose = require("mongoose")

const schema = mongoose.Schema({
	x: Number,
    y: Number,
})

module.exports = mongoose.model("coordinates", schema);