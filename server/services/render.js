
exports.login = (req, res) => {
	var user = require('../controller/users').find(req.session.uId);

	res.render('login');

}

exports.home = (req, res) => {
	var user = require('../controller/users').find(req.session.uId);
	res.render("index", { keys: ['ID', 'name', 'role', 'address'], data: { ID: user.uid, name: user.name, role: user.uRole, address: user.address } });
}

exports.addStudent = (req, res) => {
	res.render("addStudent");
}

exports.students = (req, res) => {
	var data = require('../controller/students').find();

	res.render('students', { data });
}

