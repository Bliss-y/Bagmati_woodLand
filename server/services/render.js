const moment = require('moment');

exports.login = (req, res) => {
	if (req.session.uID) {
		return res.redirect('/');
	}
	var user = require('../controller/users').find(req.session.uID);

	res.render('login');

}

exports.home = async (req, res) => {
	var user = await require('../controller/users').find(req.session.uID);
	console.log(user);
	res.render("index", { keys: ['ID', 'name', 'role', 'address'], data: { ID: user.uID, name: user.name, role: user.role, address: user.address } });
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
		var hi = moment(me.dob).format('YYYY-MM-DD');
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
	await require('../controller/' + type).delete(id);
	res.redirect('/');
}

exports.announcements = async (req, res) => {
	const announcements = await require('../controller/announcements').find();
	data = [];
	// destructure the data/// 
	for (let i in announcements) {
		var d = {
			_id: announcements[i]._id,
			user: announcements[i].user.name,
			date: moment(announcements[i].date).format('YYYY-MM-DD'),
			title: announcements[i].title,
			text: announcements[i].text
		}
		data.push(d);
	}

	res.render('announcement', { data });
}

exports.announce = async (req, res) => {
	res.render('addAnnouncement', { data: {} });
}

exports.courses = async (req, res) => {
	const courses = await require('../controller/courses').find();
	var data = [];
	for (let i in courses) {
		var m = {};
		var modules = await require('../controller/modules').find({ course: courses[i].name });
		m = {
			_id: courses[i]._id,
			name: courses[i].name,
			duration: courses[i].duration,
			modules,
			description: courses[i].description
		}
		data.push(m);

	}

	res.render('courses', { data });
}

exports.addCourse = (req, res) => {
	res.render('addCourse', { data: {} });
}

exports.module = async (res, req) => {
	const { name } = req.params;
	const module = await require('../controller/modules').find({ name: name });

	res.json(module);
}

exports.addModule = async (req, res) => {
	const { course } = req.params;
	res.render('addModule', { data: {}, course });
}

exports.editModule = async (req, res) => {
	const { _id } = req.params;
	const module = await require('../controller/modules').find({ _id, course: null });
	console.log(module);
	res.render('addModule', { data: module })
}