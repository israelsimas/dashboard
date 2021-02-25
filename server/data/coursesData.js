var mongoose = require('mongoose');
const Course = require("../models/courses");
const Coordinate = require("../models/coordinates"); // TODO
const dbHost = process.env.DB_HOST || "192.168.0.105";
const dbCollection = process.env.DB_COLLECTION || "dashboard";

//Set up default mongoose connection
let mongoDB = `mongodb://${dbHost}/${dbCollection}`;
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () =>
    console.log("connected to DB")
);

//Get the default connection
const connection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.getCourses = async (req, res) => {
	try {
		const courses = await Course.find();
		return courses;
	} catch (err) {
		return { message: err };
	}
  };

exports.getCourse = async function (id) {

	try {
        const course = await Course.findById(id);
		return course;
	} catch (err) {
		return { message: err };
	}
};

exports.saveCourse = async function (newCourse) {

    const course = new Course({ name: newCourse.name });
	try {
        const result = await course.save();
        const resultCourse = await Course.findById(result.id);
		return resultCourse;
	} catch (err) {
		return { message: err };
	}
};

exports.updateCourse = async function (id, newCourse) {
	try {
        const result = await Course.findByIdAndUpdate({ _id: id }, { name: newCourse.name });
	} catch (err) {
		return { message: err };
	}
};

exports.deleteCourse = async function (id) {
	try {
        const result = await Course.remove({ _id: id });
	} catch (err) {
		return { message: err };
	}
};