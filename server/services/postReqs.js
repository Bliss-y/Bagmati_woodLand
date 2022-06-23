const session = require('express-session');
const moment = require('moment');


// logs the user in (only if user is logged out or no sessoin exists)
exports.login = async (req, res, next) => {
	try {
		if (!req.session.uID) {
			if (await require('../controller/sessionControl').logIn(req.session, req.body.uid, req.body.pass)) {
				return res.redirect('/');

			}
		}
		return res.redirect('/login');
	} catch (err) { next(err); }
}

//clears session and logs the user out
exports.logout = async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				res.redirect('/');
			}
		})
		return res.redirect('/login');
	} catch (err) { next(err); }
}

// adds either teacher or students
exports.addUser = async (req, res, next) => {
	try {
		const User = require('../controller/' + req.params.type).add(req.body, (err) => {
			if (err) {
				return next(err);
			}
			else {
				console.log("added user!!");
				res.redirect('/admin/adduser/' + req.params.type)
			};
		});
	} catch (err) { next(err); }
}


// edits either students or teachers
exports.editUser = async (req, res, next) => {
	try {
		const { type } = req.params;
		req.body._id = req.params._id;
		let editedUser = await require('../controller/' + type).edit(req.body);
		if (editedUser.err) { return next({ err: editetUser.err }) }
		else { return res.redirect('/admin/users/' + type) }
	} catch (err) { next(err); }
}


exports.announce = async (req, res, next) => {
	try {
		const { title, text } = req.body;
		console.log(req.session.uID);
		const _uid = req.session.uID;
		const announcement = await require('../controller/announcements.js').add({ title, _uid, text });
		res.redirect('/announcements');
	} catch (err) { next(err); }
}

exports.addCourse = async (req, res, next) => {
	try {
		const { name, duration, description } = req.body;
		const announcement = await require('../controller/courses.js').add({ name, duration, description });
		res.redirect('/admin/courses');
	} catch (err) { next(err); }
}

exports.addModule = async (req, res, next) => {
	try {
		const { course } = req.params;
		const module = await require('../controller/modules').add(req.body, course);
		res.redirect('/admin/courses');
	} catch (err) { next(err); }
}

exports.editModule = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const module = await require('../controller/modules').edit(req.body, _id);
		res.redirect('/admin/courses');
	} catch (err) { next(err); }
}

exports.addLog = async (req, res, next) => {
	try {
		const { text } = req.body;
		const { user } = req.params;
		const log = await require('../controller/logs').add({ user, text });
		res.redirect('/logs/');
	} catch (err) { next(err); }
}
