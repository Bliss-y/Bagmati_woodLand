/**
 * @file: responses for reqs from teacher
*/


const session = require('express-session');
const fs = require('fs');
const { type } = require('os');



exports.home = async (req, res) => {
	var user = await require('../controller/users').find({ _id: req.session.uID });
	var data = { ID: user.uID, name: user.name, role: user.role, address: user.address }
	var divs = [];
	return res.render("tchIndex", { data, divs });
}

exports.assignments = async (req, res) => {
	const assignments = await require('../controller/assignments').findByModule(req.session.module);
	res.render('assignments', { data: assignments });
}

exports.addAssignment = async (req, res) => {
	res.render('addAssignment');
}

exports.saveAssignments = async (req, res) => {
	const { due, title } = req.body;
	const module = req.session.module;
	const filename = req.file.originalname;
	extension = filename.substring(filename.lastIndexOf('.'), filename.length);
	const assign = await require('../controller/assignments').add({ module, due, title, extension });
	await fs.promises.writeFile('./testUploads/' + assign._id + extension, req.file.buffer);
	res.redirect('/teacher/addAssignments');
}

exports.submissions = async (req, res) => {
	const assignment = req.params.assignment;
	const submissions = await require('../controller/submissions').find({ assignment });
	const data = [];
	for (let i in submissions) {
		var m = {};
		m.uid = submissions[i].student.id;
		m.name = submissions[i].student.name;
		m.comments = submissions[i].comments;
		m.date = submissions[i].date;
		data.push(m);
	}
	const subModule = await require('../controller/modules').find({ id: req.session.module, course: undefined }).name;

	res.render('submissions', { data, module: subModule });
}

exports.grade = async (req, res) => {
	const { id } = req.params;
	const { grade, feedback } = req.body;
	await require('../controller/submissions').grade({ _id: id, grade, feedback, teacher: req.session._id });
	res.redirect('/submissions');
}

exports.module = async (req, res) => {
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
}

exports.delete = async (req, res) => {
	const { type, _id } = req.params;
	const del = await require('../controller/' + type).delete(_id);
	res.send('Deleted Successfully');
}
