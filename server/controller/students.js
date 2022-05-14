const mongoose = require('mongoose');
const Student = require('../model/Student.js');

exports.find = () => {
	const students = Student.findById('627e311b74708a27cc4d8c87');
	return students;
}


exports.add = (user, course) => {

	const student = new Student({

		user: mongoose.Types.ObjectId(user._id),
		course: course

	})
	student.save();
}