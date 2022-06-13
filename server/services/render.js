const moment = require('moment');

exports.login = (req, res) => {
	if (req.session.uID) {
		return res.redirect('/');
	}

	res.render('login');

}

exports.home = async (req, res) => {
	var user = await require('../controller/users').find({ _id: req.session.uID });
	var data = { ID: user.uID, name: user.name, role: user.role, address: user.address }
	return res.render("index", { data });
}

exports.addUser = async (req, res) => {
	const { type } = req.params;
	switch (type) {
		case "students":
			const courses = await require('../controller/courses').find();
			res.render("addStudent", { data: {}, courses });

			break;
		case "teachers":
			const modules = await require('../controller/modules').find({});
			console.log(modules);
			res.render("addTeacher", { data: {}, modules });
			break;
	}
}

exports.uData = async (req, res) => {
	const { type } = req.params;
	var users = await require('../controller/' + type).find();
	var data = require('../controller/users').parseUsers(users, type);

	res.render('students', { data, dataType: type });
}

exports.editUser = async (req, res) => {
	const { _id, type } = req.params;
	var User = await require('../controller/' + type).find(_id);
	if (!User) {
		console.log('no student');
		res.redirect('adduser/' + type);
	}

	/**
	 * @TODO Data Destructuring Turn it into funcction later !! 
	 */
	var keys = Object.keys(User.user.toJSON());
	var personalKeys = Object.keys(User.toJSON());
	var data = {};
	for (let i in keys) {
		if (keys[i] != '_id' && keys[i] != 'password') {
			data[keys[i]] = User.user[keys[i]];
		}
	}

	for (let i in personalKeys) {
		if (personalKeys[i] != 'user' && personalKeys[i] != 'dob') {
			data[personalKeys[i]] = User[personalKeys[i]];
		}
	}
	const hi = moment(data.dob).format('YYYY-MM-DD');
	data.dob = hi;
	if (type == 'students') {
		const courses = await require('../controller/courses').find();
		return res.render('addStudent', { data, courses })
	};
	const modules = require('../controller/modules').find({});
	return res.render('addTeacher', { data, modules });

}

exports.remove = async (req, res) => {
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

	res.render(req.session.role + 'Announcement', { data, role: req.session.role });
}

exports.announce = async (req, res) => {
	res.render('addAnnouncement', { data: {} });
}

exports.courses = async (req, res) => {
	const courses = await require('../controller/courses').find();
	var data = [];
	for (let i in courses) {
		var m = {};
		var modules = await require('../controller/modules').find({ id: null, course: courses[i]._id });
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
	res.render('addModule', { data: module })
}

exports.logs = async (req, res) => {
	const user = req.session.uID;
	const role = req.session.role;
	const data = await require('../controller/logs').find({ user });
	res.render(role + 'Logs', { data, user });

}

exports.addLog = async (req, res) => {
	res.render('addLog', { data: undefined });
}

exports.test = async (req, res) => {

	const { type } = req.params;
	const tests = require('../controller/TestFile');
	switch (type) {
		case "addcourses":
			console.log('tf');
			await tests.addDummyCourses(4);
			break;
		case "addmodules":
			console.log('tf');
			await tests.addModulesForAllCourses(3);
			break;
		case "addstudents":
			console.log('tf');
			await tests.addDummyStudents(3);
			break;
		case "addannouncements":
			console.log('tf');
			await tests.addDummyAnnouncements(2);
			break;
		case "addteachers":
			break;
		case "addAssignments":
			break;
		case "addsubmission":
			break;
		case "addlogs":
			break;
		case "deleteannouncements":
			break;
		case "deletecourses":
			break;
		case "deletestudents":
			break;
		case "dropdatabase":
			await require('mongoose').connection.db.dropDatabase();
			break;
	}
	res.redirect('/admin/test');
}