const express = require('express');
const router = express.Router();
const coursesService = require('../service/coursesService');
const Joi = require('joi');

router.get('/api/courses', async (req, res) => {

	const courses = await coursesService.getCourses();
	res.json(courses);
});

router.get('/api/courses/:id', async (req, res) => {
	const course = await coursesService.getCourse(req.params.id);
	res.json(course);
});

router.post('/api/courses', async (req, res) => {

	const course = req.body;
    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course); 
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    }
	
	const newCourse = await coursesService.saveCourse(course);
	res.json(newCourse);	
});

router.put('/api/courses/:id', async (req, res) => {

	const course = req.body;
    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(course); 
    if (result.error) {
		return res.status(400).send(result.error.details[0].message);
	}
	
	await coursesService.updateCourse(req.params.id, course);
	res.end();
});

router.delete('/api/courses/:id', async (req, res) => {

	await coursesService.deleteCourse(req.params.id);
	res.end();
});

module.exports = router;