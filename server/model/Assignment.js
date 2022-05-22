const mongoose = require('mongoose');

const { Schema } = mongoose;

const assignmentSchema = new Schema({
	module: {
		type: Schema.Types.ObjectId,
		ref: 'Module',
		required: true
	},
	date: { type: Date, default: Date.now },
	title: String,
	due: Date,
	extension: String

}, { versionKey: false })

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;