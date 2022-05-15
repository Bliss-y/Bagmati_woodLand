exports.notLogged = (req, res, next) => {

	if (!req.session.uId) {
		return res.redirect('/login');
	} else {
		next();
	}

}

exports.isAdmin = (req, res, next) => {
	if (req.session.role != 'Admin') {
		return res.redirect('/');
	} else {
		next();
	}
}

