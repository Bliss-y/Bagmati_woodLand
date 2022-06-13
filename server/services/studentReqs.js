/**
 * @todo might generalize the destructuring somehow too many repeating codes with different params 
 */

exports.home = async (req, res) => {
	const user = await require('../controller/users').find({ _id: req.session.uID });

	const data = { ID: user.uID, name: user.name, role: user.role, address: user.address };
	res.render('stdIndex', { data });
}

exports.modules = async (req, res) => {
	const modules = await require('../controller/modules').find({ id: null, course: req.session.course });
	res.render('modules', { data: modules });
}

/**
 * 
 * @Produce give assignment with submissions by the student, and a button to submit 
 */
exports.assignment = async (req, res) => {
	const assignments = await require('../controller/assignments').findByModule(req.params.module);

	res.render('stdAssignments', { data: assignments });
}

exports.submit = async (req, res) => {
	const { assignment } = req.params;
	const submission = await require('../controller/submissions').findForStudent({ student: req.session._id, assignment });
	const assign = await require('../controller/assignments').find(assignment);
	res.render('submit', { data: submission, assignment: assign });
}

exports.saveSubmission = async (req, res) => {
	const filename = req.file.originalname;
	const { comment } = req.body;
	const extension = filename.substring(filename.lastIndexOf('.'), filename.length);
	const submission = await require('../controller/submissions').add(req.params.assignment, req.session._id, extension, comment);

	await require('fs').promises.writeFile('./testUploads/' + submission + extension, req.file.buffer);
	res.redirect('/modules');
}

exports.availableTutors = async (req, res) => {
	const { _id } = req.params;
	if (await require('../controller/students').checkPersonalTutor(_id, req.session._id)) {
		res.render('availableTutors', { data: [] });
	}
	let data = await require('../controller/teachers').findByModule(_id);
	res.render('availableTutors', { data });

}

exports.requestTutor = async (req, res) => {
	const { _id, teacher } = req.params;
	const student = req.session._id;
	let requests = require('../model/PersonalTutorRequests');
	let request = new requests({
		student: student,
		teacher: teacher
	}, (data, err) => {
		if (err) res.send(err);
	});
	await request.save();

	res.redirect('/modules');
}
