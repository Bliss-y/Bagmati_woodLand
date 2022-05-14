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

route.get('/students/', sessionControl.notLogged, sessionControl.isAdmin, renders.students);



route.get('/students/add', sessionControl.notLogged, renders.addStudent);


route.post('/students/add', sessionControl.notLogged, postReqs.addUser);



// route.post('/file', upload.single('upfile'), (req, res) => {
// 	console.log(req.file);
// 	fs.promises.writeFile('./testUploads/' + req.file.originalname, req.file.buffer);
// 	res.redirect('/');
// });

route.get('/file', (req, res) => {
	res.render('file');
})

// Test Routes

route.get('/api', (req, res) => {
	const mongoose = require('mongoose');
	const User = require('../model/User.js');
	var id;
	User.findOne({}).limit(1).sort({ $natural: -1 }).exec((err, data) => {
		id = data.uID;
		console.log(id);
	})

	res.send(id + "")

})


// 

module.exports = route;

