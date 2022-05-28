/**
 * @Purpose = Handles all the queries that might arise for the system about assignments
 */


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

exports.delete = async (_id) => {

	const assignment = await Assignment.findById(_id).populate();
	const path = require("path");
	const fs = require("fs");
	fs.unlinkSync(path.resolve(__dirname, "../../testUploads/" + _id + assignment.extension));
	await Assignment.findOneAndDelete({ _id });
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