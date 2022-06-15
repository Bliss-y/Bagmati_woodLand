const session = require('express-session');
const moment = require('moment');

exports.login = async (req, res) => {
	var userFile = require('../controller/users');
	if (!req.session.uID) {
		if (require('../controller/sessionControl').logIn(req.session, req.uID, req.pass)) {
			return res.redirect('/');
		}
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
	console.log('here');
	const User = require('../controller/' + req.params.type).add(req.body, (err) => {
		if (err) {
			console.log(err._message);
			res.render('error', { err: err._message });
		}
		else res.redirect('/admin/adduser/' + req.params.type);
	});

}

exports.editUser = async (req, res) => {
	const { type } = req.params;
	req.body._id = req.params._id;
	let editedUser = await require('../controller/' + type).edit(req.body);
	if (editedUser.err) { return res.render('test', { err: editedUser.err }) };
	res.redirect('/admin/users/' + type);
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
	console.log('requested to add course');
	const { name, duration, description } = req.body;
	const announcement = await require('../controller/courses.js').add({ name, duration, description });
	res.redirect('/admin/courses');
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

exports.addLog = async (req, res) => {
	const { text } = req.body;
	const { user } = req.params;
	const log = await require('../controller/logs').add({ user, text });
	res.redirect('/logs/');
}
