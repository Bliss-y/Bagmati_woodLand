const Announcement = require('../model/Announcement.js');

exports.find = async (_id) => {
	return await Announcement.findOne({ _id }).populate();
}

exports.add = async ({ _uid, text, title }) => {
	const announcement = await new Announcement({
		user: _uid,
		text,
		title,
		date: new Date()
	});
	announcement.save();
	return Announcement;
}

exports.delete = (_id) => {
	Announcement.findOneAndDelete({ _id });
}

exports.edit = (_id, { _uid, text }) => {
	Announcement.findByIdAndUpdate({ _id }, {
		user: _uid,
		text,
		title
	})
}

