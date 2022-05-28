/**
 * @Purpose = Handles all the queries that might arise for the system about announcements
 */

const Announcement = require('../model/Announcement.js');

exports.find = async (_id) => {
	const announcement = await Announcement.find({}).sort({ date: -1 }).populate('user');
	return announcement;
}

exports.add = async ({ _uid, text, title }) => {
	const announcement = new Announcement({
		user: _uid,
		text,
		title,
		date: new Date()
	});
	await announcement.save();
	return Announcement;
}

exports.delete = async (_id) => {
	await Announcement.findOneAndDelete({ _id });
}

exports.edit = (_id, { _uid, text }) => {
	Announcement.findByIdAndUpdate({ _id }, {
		user: _uid,
		text,
		title
	})
}

