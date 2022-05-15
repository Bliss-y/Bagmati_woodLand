const Log = require('../model/Log.js');

exports.find = async (_id) => {
	return await Log.findOne({ _id }).populate();
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