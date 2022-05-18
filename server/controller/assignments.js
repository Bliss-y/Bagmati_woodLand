const Assignment = require('../model/Assignment.js');

exports.find = async (_id) => {
	if (!_id) {
		return await Assignment.find({}).populate();
	}

	return await Assignment.findOne({ _id }).populate();
}

exports.add = async ({ module, due, title, extension }) => {
	const assignment = await new Assignment({
		title,
		module,
		due,
		extension
	});
	assignment.save();
	return assignment;
}

exports.delete = (_id) => {
	Assignment.findOneAndDelete({ _id });
}

exports.edit = (_id, { mId, date, due }) => {
	Assignment.findByIdAndUpdate({ _id }, {
		module: mId,
		due
	})
}

exports.findByModule = async (module) => {
	return await Assignment.find({ module }).populate('module');
}