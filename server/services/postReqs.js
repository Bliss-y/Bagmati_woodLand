const session = require('express-session');
const moment = require('moment');

exports.login = async (req, res) => {
	console.log(req.session.uID);
	if (!req.session.uID) {
		const { uid, pass } = req.body;
		const findUser = await require('../controller/users').verify(uid, pass);
		if (!findUser) {
			return res.redirect('/login');
		}
		req.session.uID = findUser._id;
		const role = findUser.role;
		req.session.role = role;

		if (role == "teacher" || role == "student") {
			const type = await require('../controller/' + role + 's').getID(findUser._id);
			req.session.id = type._id;
			req.session.module = type.module;
			req.session.course = type.course;

		}
		return res.redirect('/' + role);
	}
	return res.redirect('/login');
}

exports.logout = async (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.redirect('/');
		}
	})
	return res.redirect('/login');
}

exports.addUser = async (req, res) => {
	delete req.body._id;

	const User = require('../controller/' + req.params.type).add(req.body);
	res.redirect('/adduser/' + req.params.type);
}

exports.editUser = async (req, res) => {
	const { type } = req.params;
	const User = await require('../controller/' + type).edit(req.body);

	res.json(User);
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

exports.announce = async (req, res) => {
	const { title, text } = req.body;
	const _uid = req.session.uID;
	const announcement = await require('../controller/announcements.js').add({ title, _uid, text });
	res.redirect('/announcements');
}

exports.addCourse = async (req, res) => {
	const { name, duration, description } = req.body;

	const announcement = await require('../controller/courses.js').add({ name, duration, description });
	res.redirect('/courses');
}

exports.addModule = async (req, res) => {
	const { course } = req.params;
	const module = await require('../controller/modules').add(req.body, course);
	res.redirect('/courses');
}

exports.editModule = async (req, res) => {
	const { _id } = req.params;
	const module = await require('../controller/modules').edit(req.body, _id);
	res.redirect('/courses');
}
