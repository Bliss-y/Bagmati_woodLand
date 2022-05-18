const Submission = require('../model/Submission.js');

exports.find = async (_id) => {
	return await Submission.findOne({ _id }).populate('student').populate('teacher');
}

exports.findForStudent = async ({ student, course }) => {
	return await Submission.find({ student, })
}

exports.add = async ({ _uid, text, title, date }) => {
	const Log = await new Log({
		user: _uid,
		text,
		title,
		date
	});
	Log.save();
	return Log;
}

exports.delete = (_id) => {
	Log.findOneAndDelete({ _id });
}

exports.edit = (_id, { _uid, text, title, date }) => {
	Log.findByIdAndUpdate({ _id }, {
		user: _uid,
		title,
		text,
		date
	})
}