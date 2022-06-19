const mongoose = require('mongoose');
const Student = require('./Student');

const { Schema } = mongoose;

const teacherSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true

	},
	module: {
		type: Schema.Types.ObjectId,
		ref: 'Module',

	},
	salary: Number,
	personalStudentId: {
		type: Schema.Types.ObjectId,
		ref: 'Student',
	}
}, { versionKey: false })



const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;