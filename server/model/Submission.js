const mongoose = require('mongoose');

const { Schema } = mongoose;

const submissionSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
		required: true

	},
	grade: String,
	teacher: {
		type: Schema.Types.ObjectId,
		ref: 'Teacher',
	},
	fileName: String,
	assignment: {
		type: Schema.Types.ObjectId,
		ref: 'Assignment',
	}

}, { versionKey: false })

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;