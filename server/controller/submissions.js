/**
 * @Purpose = Handles all the queries that might arise for the system about Submissions
 */

const Submission = require('../model/Submission.js');
const Student = require('../model/Student.js');
const Teacher = require('../model/Teacher.js');

exports.find = async ({ module, _id, assignment }) => {
	if (module != undefined) {
		return await Submission.find({ module }).sort({ grade: -1 }).populate('student').populate('teacher');
	}
	if (assignment != undefined) {
		return await Submission.find({ assignment }).sort({ grade: -1 }).populate('student').populate('teacher');
	}
	return await Submission.findOne({ _id }).populate('student').populate('teacher');
}

exports.findForStudent = async ({ student, assignment }) => {
	return await Submission.find({ student, assignment });
}

exports.add = async (student, assignment, filename) => {
	const submission = await new Submission({
		student,
		assignment,
		filename
	});
	submission.save();
	return submission._id;
}

exports.delete = (_id) => {
	Log.findOneAndDelete({ _id });
}

exports.edit = async ({ _id, grade, feedback, teacher }) => {
	await Submission.findByIdAndUpdate({ _id }, {
		grade,
		feedback,
		teacher
	});
}