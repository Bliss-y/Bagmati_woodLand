const mongoose = require('mongoose');
const Teacher = require('Teacher');
const Student = require('Student');

const { Schema } = mongoose;

const assignmentSchema = new Schema({
	teacher: {
		type: Schema.Types.ObjectId,
		ref: 'Teacher',
		required: true
	},
	student: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
		required: true
	},

}, { versionKey: false })

const PersonalTutorRequests = mongoose.model('PersonalTutorRequests', assignmentSchema);

module.exports = PersonalTutorRequests;