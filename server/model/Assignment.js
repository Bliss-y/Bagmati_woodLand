const mongoose = require('mongoose');

const { Schema } = mongoose;

const assignmentSchema = new Schema({
	module: {
		type: Schema.Types.ObjectId,
		ref: 'Module',
		required: true
	},
	date: new Date(),
	title: String,
	filename: String,
	due: Date

}, { versionKey: false })

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;