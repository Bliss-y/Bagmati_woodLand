const mongoose = require('mongoose');

const { Schema } = mongoose;

const announcementSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true

	},
	text: String,
	title: String,
	date: new Date()

}, { versionKey: false })

const Announcement = mongoose.model('Student', announcementSchema);

module.exports = Announcement;

