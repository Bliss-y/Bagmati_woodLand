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
	date: { type: Date, default: Date.now }

}, { versionKey: false })

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;

