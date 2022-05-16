const express = require('express');
const route = express.Router();
const renders = require('../services/render');
const sessionControl = require('../controller/sessionControl');
const postReqs = require('../services/postReqs');

/**
 * @type: Common pages
 */

route.get('/login', renders.login);

route.get("/", sessionControl.notLogged, renders.home);

route.post('/login', postReqs.login);

route.get('/users/:type', sessionControl.notLogged, sessionControl.isAdmin, renders.uData);

route.get('/announcements', sessionControl.notLogged, renders.announcements);



route.get('/adduser/:type', sessionControl.notLogged, renders.addUser);

route.get('/announce', renders.announce);
route.post('/announce', postReqs.announce);

route.post('/adduser/:type', sessionControl.notLogged, postReqs.addUser);

route.get('/students/edit/:_id', sessionControl.notLogged, sessionControl.isAdmin, renders.editStudent);

route.post('/students/edit', sessionControl.notLogged, sessionControl.isAdmin, postReqs.editStudent);

route.get('/remove/:type&:id', sessionControl.notLogged, sessionControl.isAdmin, renders.remove);
// Teachers url



// route.post('/file', upload.single('upfile'), (req, res) => {
// 	console.log(req.file);
// 	fs.promises.writeFile('./testUploads/' + req.file.originalname, req.file.buffer);
// 	res.redirect('/');
// });

route.get('/file', (req, res) => {
	res.render('file');
})

// Test Routes

route.get('/api', async (req, res) => {

	// var data = [];
	// const moment = require('moment');

	// // deconstructing users data
	// for (let i in users) {
	// 	var userD = users[i].user;
	// 	console.log(users[i].user);
	// 	console.log(delete users[i].user);
	// 	console.log("users");
	// 	console.log(users[i]);
	// 	const keys = Object.keys(users[i]);
	// 	userD.dob = moment(userD.dob).format('YYYY-MM-DD');
	// 	for (let key in keys) {
	// 		userD[keys[key]] = users[keys[key]];
	// 	}
	// 	console.log(userD);
	// 	data.push(userD);
	// }
	// if (data.length == 0) {
	// 	return res.json({ message: "no Students found visit : /students/add" });
	// }
	// console.log(data);
	// res.json({ data: data[0] });

})


// 

module.exports = route;

