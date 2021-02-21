const sqlite3 = require('sqlite3').verbose();
const Joi = require('joi');
const express = require('express');
const app = express();

let db = new sqlite3.Database('database.sql', (err) => {
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

app.use(express.json());
app.use('/static', express.static('public'));
app.use(express.static('public'));

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body); 
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID does not exist!');
        return;
    }

    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body); 
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID does not exist!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.send(course);
    } else {
        res.status(404).send('The course with the given ID does not exist!');
    }
});

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/database', (req, res) => {

    let sql = `SELECT DISTINCT Nome name FROM TAB_RING ORDER BY name`;   

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });

    res.send("Table read success!!");

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));