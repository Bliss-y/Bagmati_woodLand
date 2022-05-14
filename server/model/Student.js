const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true

	},
	course: String

})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;