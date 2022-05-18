const express = require('express');
const route = express.Router();
const reqs = require('../services/teacherReqs.js');
const multer = require('multer');
const upload = multer();

route.get('/', reqs.home);
route.get('/assignments', reqs.assignments);

route.get('/addAssignments', reqs.addAssignment);
route.post('/addAssignments', upload.single('upfile'), reqs.saveAssignments);

module.exports = route;