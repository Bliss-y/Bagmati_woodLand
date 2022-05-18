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

route.get("/", sessionControl.notLogged, (req, res) => {
	res.redirect('/' + req.session.role);
});

route.post('/login', postReqs.login);
route.get('/logout', postReqs.logout);

route.get('/users/:type', sessionControl.notLogged, sessionControl.isAdmin, renders.uData);

route.get('/announcements', sessionControl.notLogged, renders.announcements);


/**
 * @requires:- admin
 */







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



/**
 * @Tests 
 */

route.get('/api', async (req, res) => {

	res.render('hi')

})

route.get('/role', (req, res) => {
	const session = require('express-session');
	res.send(req.session.role + " " + req.session.id);
})

// 

module.exports = route;

