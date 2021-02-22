// const database = require('../infra/database');

const Joi = require('joi');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data/database.sql', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
];

exports.getCourses = function () {
	// return database.query('select * from blog.post');
    return courses;
};

exports.getCourse = function (id) {
	// return database.oneOrNone('select * from blog.post where id = $1', [id]);

    const course = courses.find(c => c.id === parseInt(id));
    if (course) {
        return course;
    } else {
        return 'The course with the given ID does not exist!';
    }
};

exports.saveCourse = function (newCourse) {
	// return database.one('insert into COURSE (name) values ($1) returning *', [course.name]);

    const course = {
        id: courses.length + 1,
        name: newCourse.name
    }
    courses.push(course);
    
    return course;
};

exports.updateCourse = function (id, newCourse) {
	// return database.none('update blog.post set title = $1, content = $2 where id = $3', [post.title, post.content, id]);

    const course = courses.find(c => c.id === parseInt(id));
    if (!course) {
        // res.status(404).send('The course with the given ID does not exist!');
        return;
    }

    course.name = newCourse.name;
};

exports.deleteCourse = function (id) {
	// return database.none('delete from blog.post where id = $1', [id]);

    const course = courses.find(c => c.id === parseInt(id));
    if (!course) {
        // return res.status(404).send('The course with the given ID does not exist!');
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
};