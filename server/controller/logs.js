/**
 * @Purpose = Handles all the queries that might arise for the system about Logs
 */

const Log = require('../model/Log.js');

exports.find = async ({ _id, user }) => {
	if (user) {
		return await Log.find({ user }).populate();
	}

	return await Log.findById(_id).populate();
}

exports.add = async ({ user, text }) => {
	const log = await new Log({
		user,
		text,
	});
	log.save();
	return log;
}

exports.delete = async (_id) => {
	await Log.findOneAndDelete({ _id });
}

exports.edit = (_id, { _uid, text, title, date }) => {
	Log.findByIdAndUpdate({ _id }, {
		user: _uid,
		title,
		text,
		date
	})
}