const mongoose = require('mongoose');
const User = require('./User.js');

const { Schema } = mongoose;

const studentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true

	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',

	},




}, { versionKey: false })

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;