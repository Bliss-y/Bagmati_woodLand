/**
 * @file: handles all requests from Student
 */

const express = require('express');
const route = express.Router();
const sessionControl = require('../controller/sessionControl');
const reqs = require('../services/studentReqs');
const multer = require('multer');
const upload = multer();

route.get('/', reqs.home);

route.get('/modules', reqs.modules);
route.get('/assignments/:module', reqs.assignment);
route.get('/submit/:assignment', reqs.submit);
route.post('/submit/:assignment', upload.single('upfile'), reqs.saveSubmission);
route.get('/tutor/:_id', reqs.availableTutors);
route.post('/tutor/:_id&:teacher', reqs.requestTutor);


module.exports = route;