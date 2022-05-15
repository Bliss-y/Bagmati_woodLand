const session = require('express-session');
const moment = require('moment');
const mongoose = require('mongoose');

exports.login = (req, res) => {
	console.log(req.session.uId);
	if (!req.session.uId) {
		const { uid, pass } = req.body;
		const findUser = require('../controller/users').find(uid, pass);
		if (!findUser) {
			return res.redirect('/login');
		}
		req.session.uId = findUser.uid;
		req.session.role = findUser.uRole;
		return res.redirect('/');
	}
	res.redirect('/');
}

exports.addUser = async (req, res) => {
	delete req.body._id;

	const User = require('../controller/' + req.params.type).add(req.body);
	res.redirect('/adduser/' + req.params.type);
}

exports.addTeacher = async (req, res) => {
	const { name, email, dob, module, phoneNumber, salary } = req.body;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, course, role })
	require('../controller/teachers.js').add(user, { module, salary });
	// const Student = ;

	res.redirect('/teachers/add');
}

exports.editStudent = async (req, res) => {
	req.body.course = await require('../controller/users.js').find(req.body.course);
	const User = await require('../controller/students.js').edit(req.body);

	res.json(User);
}

