const coursesData = require('../data/coursesData');

exports.getCourses = function () {
	return coursesData.getCourses();
};

exports.getCourse = function (id) {
	return coursesData.getCourse(id);
};

exports.saveCourse = function (course) {
	return coursesData.saveCourse(course);
};

exports.updateCourse = function (id, course) {
	return coursesData.updateCourse(id, course);
};

exports.deleteCourse = function (id) {
	return coursesData.deleteCourse(id);
};