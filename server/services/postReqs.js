const session = require('express-session');
const moment = require('moment');


// logs the user in (only if user is logged out or no sessoin exists)
exports.login = async (req, res) => {
	var userFile = require('../controller/users');
	if (!req.session.uID) {
		if (require('../controller/sessionControl').logIn(req.session, req.uID, req.pass)) {
			return res.redirect('/');
		}
	}
	return res.redirect('/login');
}

//clears session and logs the user out
exports.logout = async (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.redirect('/');
		}
	})
	return res.redirect('/login');
}

// adds either teacher or students
exports.addUser = async (req, res, next) => {
	console.log('here');
	const User = require('../controller/' + req.params.type).add(req.body, (err) => {
		if (err) {
			return next(err);
		}
		else res.redirect('/admin/adduser/' + req.params.type);
	});
}


// edits either students or teachers
exports.editUser = async (req, res) => {
	const { type } = req.params;
	req.body._id = req.params._id;
	let editedUser = await require('../controller/' + type).edit(req.body);
	if (editedUser.err) { return next({ err: editetUser.err }) }
	else { return res.redirect('/admin/users/' + type) }
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
