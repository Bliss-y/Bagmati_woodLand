/**
 * @todo might generalize the destructuring somehow too many repeating codes with different params 
 */
const mongoose = require('mongoose');

exports.home = async (req, res, next) => {
	try {
		const user = await require('../controller/users').find({ _id: req.session.uID });

		const data = { ID: user.uID, name: user.name, role: user.role, address: user.address };
		res.render('stdIndex', { data });
	} catch (err) { next(err); }
}

exports.modules = async (req, res, next) => {
	try {
		const modules = await require('../controller/modules').find({ id: null, course: req.session.course });
		res.render('modules', { data: modules });
	} catch (err) { next(err); }
}

/**
 * 
 * @Produce give assignment with submissions by the student, and a button to submit 
 */
exports.assignment = async (req, res, next) => {
	try {
		const assignments = await require('../controller/assignments').findByModule(req.params.module);

		res.render('stdAssignments', { data: assignments });
	} catch (err) { next(err); }
}

exports.submit = async (req, res, next) => {
	try {
		const { assignment } = req.params;
		const submission = await require('../controller/submissions').findForStudent({ student: req.session._id, assignment });
		const assign = await require('../controller/assignments').find(assignment);
		res.render('submit', { data: submission, assignment: assign });
	} catch (err) { next(err); }
}

exports.saveSubmission = async (req, res, next) => {
	try {
		const filename = req.file.originalname;
		const { comment } = req.body;
		const extension = filename.substring(filename.lastIndexOf('.'), filename.length);
		const submission = await require('../controller/submissions').add(req.params.assignment, req.session._id, extension, comment);

		await require('fs').promises.writeFile('./testUploads/' + submission + extension, req.file.buffer);
		res.redirect('/modules');
	} catch (err) { next(err); }
}

exports.availableTutors = async (req, res, next) => {
	try {
		const { module } = req.params;
		if (await require('../controller/students').checkPersonalTutor(module, req.session._id)) {
			res.render('requestTutor', { data: [], requested: true });
		}
		let teacher = await require('../controller/personalTutorRequests').find({ module, student: req.session._id }).teacher;
		if (teacher) {
			return res.render('requestTutor', { data: [], requested: true });
		}
		const data = await require('../controller/teachers').getAvailableTeachers(module);
		res.render('requestTutor', { data });
	} catch (err) { next(err); }

}

exports.requestTutor = async (req, res, next) => {
	try {
		const { teacher, module } = req.params;
		const requests = require('../controller/personalTutorRequests');
		const request = await requests.add(req.session._id, teacher, module);
		res.redirect('/student/modules');
	} catch (err) { next(err); }
}

exports.personalTutors = async (req, res, next) => {
	try {
		const data = await require('../controller/students').getPersonalTutor(req.session._id);
		console.log(data);
		res.render('personalTutors', { data });
	} catch (err) { next(err); }
}
