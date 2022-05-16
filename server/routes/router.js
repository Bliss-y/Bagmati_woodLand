const express = require('express');
const route = express.Router();
const renders = require('../services/render');
const sessionControl = require('../controller/sessionControl');
const postReqs = require('../services/postReqs');

/**
 * 
 * @type: Common pages
 * 
 */

route.get('/login', renders.login);

route.get("/", sessionControl.notLogged, renders.home);

route.post('/login', postReqs.login);

route.get('/users/:type', sessionControl.notLogged, sessionControl.isAdmin, renders.uData);

route.get('/announcements', sessionControl.notLogged, renders.announcements);


/**
 * @requires:- admin
 */


route.get('/announce', renders.announce);
route.post('/announce', postReqs.announce);

route.get('/courses', sessionControl.notLogged, renders.courses);

route.get('/addcourse', sessionControl.notLogged, renders.addCourse);
route.post('/addcourse', sessionControl.notLogged, postReqs.addCourse);

route.get('/adduser/:type', sessionControl.notLogged, renders.addUser);
route.post('/adduser/:type', sessionControl.notLogged, postReqs.addUser);


// route.get('/students/edit/:_id', sessionControl.notLogged, sessionControl.isAdmin, renders.editStudent);
// route.post('/students/edit', sessionControl.notLogged, sessionControl.isAdmin, postReqs.editStudent);

route.get('/edituser/:type&:_id', sessionControl.notLogged, sessionControl.isAdmin, renders.editUser);
route.post('/edituser/:type&:_id', sessionControl.notLogged, sessionControl.isAdmin, postReqs.editUser);

route.get('/remove/:type&:id', sessionControl.notLogged, sessionControl.isAdmin, renders.remove);

route.get('/addmodule/:course', sessionControl.notLogged, sessionControl.isAdmin, renders.addModule);
route.post('/addmodule/:course', sessionControl.notLogged, sessionControl.isAdmin, postReqs.addModule);
route.get('/editmodule/:_id', sessionControl.notLogged, sessionControl.isAdmin, renders.editModule);
route.post('/editmodule/:_id', sessionControl.notLogged, sessionControl.isAdmin, postReqs.editModule);




/**]
 * @TeachersPages 
 */








/**
 * @requires : Students
 */



// route.post('/file', upload.single('upfile'), (req, res) => {
// 	console.log(req.file);
// 	fs.promises.writeFile('./testUploads/' + req.file.originalname, req.file.buffer);
// 	res.redirect('/');
// });



route.get('/file', (req, res) => {
	res.render('file');
})


/**
 * @Tests 
 */

route.get('/api', async (req, res) => {

	res.render('hi')

})


// 

module.exports = route;

