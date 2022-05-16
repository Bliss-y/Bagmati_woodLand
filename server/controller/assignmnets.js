const Assignment = require('../model/Assignment.js');

exports.find = async (_id) => {
	if (!_id) {
		return await Assignment.find({}).populate('user');
	}

	return await Assignment.findOne({ _id }).populate('user');
}

exports.add = async ({ mId, due }) => {
	const Assignment = await new Assignment({
		module: mId,
		due
	});
	Assignment.save();
	return Assignment;
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