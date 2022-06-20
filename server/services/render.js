const moment = require('moment');

exports.login = (req, res, next) => {
	try {
		if (req.session.uID) {
			return res.redirect('/');
		}

		res.render('login');
	} catch (err) { next(err); }
}

exports.home = async (req, res, next) => {
	try {
		var user = await require('../controller/users').find({ _id: req.session.uID });
		var data = { ID: user.uID, name: user.name, role: user.role, address: user.address }
		return res.render("index", { data });
	} catch (err) { next(err); }
}

exports.addUser = async (req, res, next) => {
	try {
		const { type } = req.params;
		switch (type) {
			case "students":
				const courses = await require('../controller/courses').find();
				res.render("addStudent", { data: {}, courses });

				break;
			case "teachers":
				const modules = await require('../controller/modules').find({});
				res.render("addTeacher", { data: {}, modules });
				break;
		}
	} catch (err) {
		next(err)
	};
}

exports.uData = async (req, res, next) => {
	try {
		const { type } = req.params;
		var users = await require('../controller/' + type).find();
		var data = require('../controller/users').parseUsers(users, type);
		res.render('students', { data, dataType: type });
	}
	catch (err) {
		next(err);
	}
}

exports.editUser = async (req, res, next) => {
	try {
		const { _id, type } = req.params;
		var User = await require('../controller/' + type).find(_id);
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
		const formattedDate = moment(data.dob).format('YYYY-MM-DD');
		data.dob = formattedDate;
		if (type == 'students') {
			const courses = await require('../controller/courses').find();
			return res.render('addStudent', { data, courses })
		};
		const modules = await require('../controller/modules').find({});
		return res.render('addTeacher', { data, modules });
	} catch (err) {
		next(err);
	}
}

exports.remove = async (req, res, next) => {
	try {
		const { type, id } = req.params;
		await require('../controller/' + type).delete(id);
		res.redirect('/');
	} catch (err) { next(err); }
}

exports.announcements = async (req, res, next) => {
	try {
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
	} catch (err) { next(err); }
}

exports.announce = async (req, res, next) => {
	try { res.render('addAnnouncement', { data: {} }); } catch (err) { next(err); }
}

exports.courses = async (req, res, next) => {
	try {
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
	} catch (err) { next(err); }
}

exports.addCourse = (req, res, next) => {
	try { res.render('addCourse', { data: {} }); } catch (err) { next(err); }
}

exports.module = async (res, req, next) => {
	try {
		const { name } = req.params;
		const module = await require('../controller/modules').find({ name: name });

		res.json(module);
	} catch (err) { next(err); }
}

exports.addModule = async (req, res, next) => {
	try {
		const { course } = req.params;
		res.render('addModule', { data: {}, course });
	} catch (err) { next(err); }
}

exports.editModule = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const module = await require('../controller/modules').find({ _id, course: null });
		res.render('addModule', { data: module })
	} catch (err) { next(err); }
}

exports.logs = async (req, res, next) => {
	try {
		const user = req.session.uID;
		const role = req.session.role;
		const data = await require('../controller/logs').find({ user });
		res.render(role + 'Logs', { data, user });
	} catch (err) { next(err); }

}

exports.addLog = async (req, res, next) => {
	try { res.render('addLog', { data: undefined }); } catch (err) { next(err); }
}

exports.test = async (req, res, next) => {
	try {
		const { type } = req.params;
		const tests = require('../../test/testLinks');
		switch (type) {
			case "addcourses":
				await tests.addCourses(4);
				break;
			case "addmodules":
				await tests.addModules(3);
				break;
			case "addstudents":
				await tests.addStudents(3);
				break;
			case "addannouncements":
				await tests.addAnnouncements(2);
				break;
			case "addteachers":
				await tests.addTeachers(3);
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
		res.redirect('/test');
	} catch (err) { next(err); }
}