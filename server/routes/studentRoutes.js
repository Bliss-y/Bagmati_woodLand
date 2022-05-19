/**
 * @file: handles all requests from Student
 */

const express = require('express');
const route = express.Router();
const sessionControl = require('../controller/sessionControl');
const reqs = require('../services/studentReqs');


route.get('/', reqs.home);

route.get('/modules', reqs.modules);
route.get('/assignments/:module', reqs.assignment);
route.get('/submit/:assignment', reqs.submit);
route.post('/submit/:assignment', reqs.saveSubmission);

module.exports = route;