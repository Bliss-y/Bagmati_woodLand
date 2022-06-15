/**
 * @Purpose = Handles all the necessary session validation after login
 */

const DEV_MODE = true;

exports.logIn = async (session, uid, pass) => {
	const userFile = require('./users');
	if (await require('./users').dataBaseEmpty()) {
		await userFile.add({ name: "Admin init", email: "email", dob: new Date(), phoneNumber: "number", role: "admin", address: "address" });
	}
	const findUser = await require('../controller/users').verify(uid, pass);
	if (!findUser) {
		return false;
	}
	session.uID = findUser._id;
	const role = findUser.role;
	session.role = role;

	if (role == "teacher" || role == "student") {
		const type = await require('../controller/' + role + 's').getID(findUser._id);
		session._id = type._id;
		session.module = type.module;
		session.course = type.course;
	}
	return true;
}

exports.notLogged = async (req, res, next) => {
	if (DEV_MODE) {
		if (req.body.dev_uiD) {
			if (await exports.logIn(req.session, req.body.dev_uiD, req.body.dev_pass)) {
				console.log(req.session.uID)
				return next();
			};
		}
		else { await exports.logIn(req.session, 1001, "Admin init") };
		return next();
	}
	if (!req.session.uID) {
		return res.redirect('/login');
	} else {
		next();
	}
}

exports.isAdmin = (req, res, next) => {
	console.log('yes');

	if (req.session.super) {
		return next();
	}
	if (req.session.role != 'admin') {

		return res.redirect('/');
	} else {
		console.log('yes');
		next();
	}
}

exports.isTeacher = (req, res, next) => {
	if (req.session.super) {
		return next();
	}
	if (req.session.role != 'student') {
		return res.redirect('/');
	} else {
		next();
	}
}

exports.isStudent = (req, res, next) => {
	if (req.session.role != 'student') {
		return res.redirect('/');
	} else {
		next();
	}
}
