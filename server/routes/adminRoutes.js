/**
 * @file: handles all requests from admin
 */

const express = require('express');
const route = express.Router();
const renders = require('../services/render');
const sessionControl = require('../controller/sessionControl');
const postReqs = require('../services/postReqs');

route.get('/', renders.home);

route.get('/users/:type', sessionControl.notLogged, sessionControl.isAdmin, renders.uData);

route.get('/announce', renders.announce);
route.post('/announce', postReqs.announce);

route.get('/courses', renders.courses);
route.get('/students/:course', renders.studentsByCourse);
route.get('/teachers/:module', renders.teachersByModule);

route.get('/addcourse', renders.addCourse);
route.post('/addcourse', postReqs.addCourse);

route.get('/adduser/:type', sessionControl.isAdmin, renders.addUser);
route.post('/adduser/:type', sessionControl.isAdmin, postReqs.addUser);

route.get('/edituser/:type&:_id', sessionControl.isAdmin, renders.editUser);
route.post('/edituser/:type&:_id', sessionControl.isAdmin, postReqs.editUser);

route.get('/remove/:type&:id', sessionControl.isAdmin, renders.remove);

route.get('/addmodule/:course', sessionControl.isAdmin, renders.addModule);
route.post('/addmodule/:course', sessionControl.isAdmin, postReqs.addModule);
route.get('/editmodule/:_id', sessionControl.isAdmin, renders.editModule);
route.post('/editmodule/:_id', sessionControl.isAdmin, postReqs.editModule);


module.exports = route;