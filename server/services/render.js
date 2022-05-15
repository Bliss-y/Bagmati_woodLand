const moment = require('moment');
exports.login = (req, res) => {
	if (req.session.uId) {
		return res.redirect('/');
	}
	var user = require('../controller/users').find(req.session.uId);

	res.render('login');

}

exports.home = (req, res) => {
	var user = require('../controller/users').find(req.session.uId);
	res.render("index", { keys: ['ID', 'name', 'role', 'address'], data: { ID: user.uid, name: user.name, role: user.uRole, address: user.address } });
}

exports.addUser = (req, res) => {
	const { type } = req.params;
	switch (type) {
		case "students":
			res.render("addStudent", { data: {} });
			break;
		case "teachers":
			res.render("addTeachers", { data: {} });
			break;
	}
}

exports.uData = async (req, res) => {
	const { type } = req.params;
	var users = await require('../controller/' + type).find();
	var data = [];

	// deconstructing users data
	var users = await require('../controller/' + type).find();
	var data = [];
	for (let x in users) {
		var keys = Object.keys(users[x].user.toJSON());
		var personalKeys = Object.keys(users[x].toJSON());
		var me = {};
		for (let i in keys) {
			if (keys[i] != '_id' && keys[i] != 'password') {
				me[keys[i]] = users[x].user[keys[i]];
			}
		}

		for (let i in personalKeys) {
			if (personalKeys[i] != 'user' && personalKeys[i] != 'dob') {
				me[personalKeys[i]] = users[x][personalKeys[i]];
			}
		}
		var hi = moment(me.dob.toString()).format('YYYY-MM-DD');
		console.log(hi);
		me.dob = hi;
		data.push(me);
	}
	console.log(data);
	res.render('students', { data, dataType: type });
}

exports.editStudent = async (req, res) => {
	const { _id } = req.params;
	var student = await require('../controller/students').find(_id);
	if (!student) {
		console.log('no student')
	}
	var data = {
		_id: student._id,
		name: student.user.name,
		email: student.user.email,
		phoneNumber: student.user.phoneNumber,
		address: student.user.address,
		uID: student.user.uID,
		dob: moment(student.user.dob.toString()).format('YYYY-MM-DD'),
		course: student.course
	}
	res.render('addStudent', { data })
}

exports.remove = async (req, res) => {
	console.log('here')
	const { type, id } = req.params;
	await require('../controller/' + type + 's').delete(id);
	res.redirect('/');
}