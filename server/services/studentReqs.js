/**
 * @todo might generalize the destructuring somehow too many repeating codes with different params 
 */

exports.home = async (req, res) => {
	const user = await require('../controller/users').find(req.session.uID);
	const data = { ID: user.uID, name: user.name, role: user.role, address: user.address };
	res.render('stdIndex', { data });
}

exports.modules = async (req, res) => {
	const modules = await require('../controller/modules').findForStudent(req.session.course);
	res.render('modules', { data: modules });
}

/**
 * 
 * @Produce give assignment with submissions by the student, and a button to submit 
 */

exports.assignment = async (req, res) => {
	const assignments = await require('../controller/assignments').findByModule(req.params.module);
	const submissions = await requiure('../controller/submissions').find(req.session.id, assignment);
	res.render('stdAssignments', { data: assignments });
}

exports.submit = async (req, res) => {
	res.render('submit');
}

exports.saveSubmission = async (req, res) => {
	const filename = req.file.originalname;
	extension = filename.substring(filename.lastIndexOf('.'), filename.length);
	const submission = await require('../controller/submissions').add(req.params.assignment, req.sessions.id, extension);
	await fs.promises.writeFile('./testUploads/' + submission + extension, req.file.buffer);
}

