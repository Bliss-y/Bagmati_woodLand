/**
 * @Purpose = Handles all the necessary session validation after login
 */


exports.notLogged = (req, res, next) => {
	if (req.session.super) {
		return next();
	}
	if (!req.session.uID) {
		return res.redirect('/login');
	} else {
		next();
	}
}

exports.isAdmin = (req, res, next) => {
	if (req.session.super) {
		return next();
	}
	if (req.session.role != 'admin') {
		return res.redirect('/');
	} else {
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

