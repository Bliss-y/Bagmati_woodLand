/**
 * @file: responses for reqs from teacher
*/


const session = require('express-session');
const fs = require('fs');
const { type } = require('os');

exports.home = async (req, res, next) => {
	try {
		var user = await require('../controller/users').find({ _id: req.session.uID });
		var data = { ID: user.uID, name: user.name, role: user.role, address: user.address }
		var divs = [];
		return res.render("tchIndex", { data, divs });
	} catch (err) { next(err); }
}

exports.assignments = async (req, res, next) => {
	try {
		const assignments = await require('../controller/assignments').findByModule(req.session.module);
		res.render('assignments', { data: assignments });
	} catch (err) { next(err); }
}

exports.addAssignment = async (req, res, next) => {
	try { res.render('addAssignment'); } catch (err) { next(err); }
}

exports.saveAssignments = async (req, res, next) => {
	try {
		const { due, title } = req.body;
		const module = req.session.module;
		const filename = req.file.originalname;
		extension = filename.substring(filename.lastIndexOf('.'), filename.length);
		const assign = await require('../controller/assignments').add({ module, due, title, extension });
		await fs.promises.writeFile('./testUploads/' + assign._id + extension, req.file.buffer);
		res.redirect('/teacher/addAssignments');
	} catch (err) { next(err); }
}

exports.submissions = async (req, res, next) => {
	try {
		const assignment = req.params.assignment;
		const submissions = await require('../controller/submissions').find({ assignment });
		const data = [];
		for (let i in submissions) {
			var m = {};
			let student = await require('../controller/students').find(submissions[i].student._id);
			m.uid = student.user.uID;
			m._id = submissions[i]._id;
			m.name = student.user.name;
			m.comment = submissions[i].comment;
			m.date = submissions[i].date;
			data.push(m);
		}
		const subModule = await require('../controller/modules').find({ id: req.session.module, course: undefined }).name;

		res.render('submissions', { data, module: subModule });
	} catch (err) { next(err); }
}

exports.grade = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { grade, feedback } = req.body;
		await require('../controller/submissions').grade({ _id: id, grade, feedback, teacher: req.session._id });
		res.redirect('/submissions');
	} catch (err) { next(err); }
}

exports.module = async (req, res, next) => {
	try {
		const { module } = req.session;
		const mod = await require('../controller/modules').find({ _id: module });
		const students = await require('../controller/students').findByCourse({ course: mod.course._id });
		var data = [];
		for (let i in students) {
			m = {}
			m.name = students[i].user.name;
			m.uID = students[i].user.uID;
			data.push(m);
		}

		res.render('module', { data: data, module })
	} catch (err) { next(err); }
}

exports.delete = async (req, res, next) => {
	try {
		const { type, _id } = req.params;
		const del = await require('../controller/' + type).delete(_id);
		res.send('Deleted Successfully');
	} catch (err) { next(err); }
}

exports.personalStudent = async (req, res, next) => {
	try {

		const personalStudent = await require('../controller/teachers').getPersonalStudent(req.session._id);
		let data;
		if (personalStudent.personalStudentId) {
			data = await require('../controller/students').find(personalStudent.personalStudentId._id);
		}
		console.log(data);
		const requests = await require('../controller/personalTutorRequests').find({ teacher: req.session._id });
		return res.render('personalStudent', { data, requests });
	} catch (err) { next(err); }
}



exports.accept = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const requests = await require('../controller/personalTutorRequests').accept(_id);
		return res.redirect('/teacher/personalStudent');
	} catch (err) { next(err); }
}

exports.decline = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const requests = await require('../controller/personalTutorRequests').delete(_id);
		return res.redirect('/teacher/personalStudent');
	} catch (err) { next(err); }
}

exports.terminateTutoring = async (req, res, next) => {
	try {
		await require('../model/Teacher').findByIdAndUpdate(req.session._id, {
			personalStudentId: null
		});
	} catch (err) {
		next(err);
	}
}