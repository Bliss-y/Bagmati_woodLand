const session = require('express-session');
const moment = require('moment');
const mongoose = require('mongoose');

exports.login = (req, res) => {
	if (!req.session.uId) {
		const { uid, pass } = req.body;
		// console.log(id, password);
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

exports.addUser = (req, res) => {
	const { name, email, dob, course, phoneNumber } = req.body;
	const User = require('../controller/users.js').add({ name, email, dob, phoneNumber, course }, (user, course) => {
		require('../controller/students.js').add(user, course);
	});
	// const Student = ;

	res.redirect('/students/add');
}