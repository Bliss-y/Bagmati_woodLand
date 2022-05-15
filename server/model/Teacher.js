const mongoose = require('mongoose');

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

teacherSchema.methods.isAval = function () {
	if (!this.personalStudentId) {
		return true;
	}
	return false;
}

teacherSchema.methods.addAsPersonalTutor = function (student) {
	if (this.isAval()) {
		return this.personalStudentId = student;
	}
}

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;