const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json());
app.use('/static', express.static('public'));
app.use(express.static('public'));
app.use('/', require('./route/routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));