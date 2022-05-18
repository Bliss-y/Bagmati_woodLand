const session = require('express-session');
const fs = require('fs');

exports.home = async (req, res) => {
	var user = await require('../controller/users').find(req.session.uID);
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
	console.log(req.file);
	extension = filename.substring(filename.lastIndexOf('.'), filename.length);
	const assign = await require('../controller/assignments').add({ module, due, title, extension });
	await fs.promises.writeFile('./testUploads/' + assign._id + extension, req.file.buffer);
	res.redirect('/teacher/addAssignments');
}