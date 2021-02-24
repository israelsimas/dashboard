const coursesData = require('../data/coursesData');

exports.getCourses = async function () {
	return await coursesData.getCourses();
};

exports.getCourse = async function (id) {
	return coursesData.getCourse(id);
};

exports.saveCourse = async function (course) {
	return coursesData.saveCourse(course);
};

exports.updateCourse = async function (id, course) {
	return coursesData.updateCourse(id, course);
};

exports.deleteCourse = async function (id) {
	return coursesData.deleteCourse(id);
};