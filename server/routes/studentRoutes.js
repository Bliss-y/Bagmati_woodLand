/**
 * @file: handles all requests from Student
 */

const express = require('express');
const route = express.Router();
const sessionControl = require('../controller/sessionControl');
const reqs = require('../services/studentReqs');


route.get('/', (req, res) => {
	res.send('hello student');
})

route.get('/modules', reqs.modules);
route.get('/assignment/:module', reqs.assignment);
route.post('/submit', reqs.submit);
route.post('/submit', reqs.saveSubmission);

module.exports = route;