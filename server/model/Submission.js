const mongoose = require('mongoose');

const { Schema } = mongoose;

const submissionSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
		required: true

	},
	date: { type: Date, default: Date.now },
	grade: String,
	teacher: {
		type: Schema.Types.ObjectId,
		ref: 'Teacher',
	},
	fileName: String,
	comment: String,
	assignment: {
		type: Schema.Types.ObjectId,
		ref: 'Assignment',
		required: true
	},
	feedback: String

}, { versionKey: false })

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;