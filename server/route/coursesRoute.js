const express = require('express');
const router = express.Router();
const coursesService = require('../service/coursesService');
const Joi = require('joi');

router.get('/api/courses', (req, res) => {
	const courses = coursesService.getCourses();
	res.json(courses);
});

router.get('/api/courses/:id', (req, res) => {
	const course = coursesService.getCourse(req.params.id);
	res.json(course);
});

router.post('/api/courses', (req, res) => {

	const course = req.body;
    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course); 
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    }
	
	const newCourse = coursesService.saveCourse(course);
	res.json(newCourse);	
});

router.put('/api/courses/:id', (req, res) => {

	const course = req.body;
    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course); 
    if (result.error) {
		return res.status(400).send(result.error.details[0].message);
	}
	
	coursesService.updateCourse(req.params.id, course);
	res.end();
});

router.delete('/api/courses/:id', (req, res) => {

	coursesService.deleteCourse(req.params.id);
	res.end();
});

module.exports = router;