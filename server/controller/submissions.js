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
	return await Submission.findOne({ student, assignment }).populate('teacher');
}

exports.add = async (assignment, student, filename, comment) => {
	const prev = await Submission.findOne({ student, assignment }).populate();
	console.log(filename);
	console.log(prev);
	if (prev) {
		const path = require("path");
		const fs = require("fs");
		fs.unlinkSync(path.resolve(__dirname, "../../testUploads/" + prev._id + prev.filename));
		await Submission.findOneAndDelete({ _id: prev._id });
	}
	const submission = await new Submission({
		student,
		assignment,
		filename,
		comment
	});
	submission.save();
	return submission._id;
}

exports.delete = async (_id) => {
	const id = Submissions.findOneById(_id).populate().filename;
	await Submission.findOneAndDelete({ _id });
	const path = require("path");
	const fs = require("fs");
	fs.unlinkSync(path.resolve(__dirname, "server/testUpload/" + _id + id));
}

exports.grade = async ({ _id, grade, feedback, teacher }) => {
	await Submission.findByIdAndUpdate({ _id }, {
		grade,
		feedback,
		teacher
	});
}
