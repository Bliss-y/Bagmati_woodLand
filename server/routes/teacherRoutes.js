/**
 * @file: handles all requests from teacher
 */

const express = require('express');
const route = express.Router();
const reqs = require('../services/teacherReqs.js');
const multer = require('multer');
const upload = multer();

route.get('/', reqs.home);
route.get('/assignments', reqs.assignments);

route.get('/addAssignments', reqs.addAssignment);
route.post('/addAssignments', upload.single('upfile'), reqs.saveAssignments);

route.get('/submissions/:assignment', reqs.submissions);

route.post('/grade/:id', reqs.grade);

route.get('/module', reqs.module);

route.get('/delete/:type&:_id', reqs.delete);

route.get('/personalStudent', reqs.personalStudent);
route.post('/personalStudent/deleteRequest/:_id', reqs.decline);
route.post('/personalStudent/acceptRequest/:_id', reqs.accept);

module.exports = route;