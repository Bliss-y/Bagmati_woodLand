const mongoose = require('mongoose');
const Student = require('../model/Student.js');

exports.find = async (id) => {
	if (!id) {
		const students = await Student.find({}).populate('user');

		return students;
	}
	const students = await Student.findById(id).populate('user');
	console.log('here');
	console.log(students);
	return students;
}

exports.getID = async (uid) => {
	const student = await Student.findOne({ user: uid }).populate();
	return student;
}


exports.add = async (user) => {
	const { name, email, dob, phoneNumber, address } = user;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, address, role: "student" });
	const getcourse = await require('../controller/courses.js').find(user.course);
	console.log(getcourse);

	const student = new Student({

		user: User._id,
		course: getcourse || null

	})
	await student.save();
}

exports.edit = async (edited) => {

	const { name, email, dob, phoneNumber, address } = user;
	const User = await require('../controller/users.js').edit({ name, email, dob, phoneNumber, address, role: "student" });
	const getcourse = await require('../controller/courses.js').find(user.course);
	console.log(getcourse);

	const student = Student.findByIdAndUpdate({ _id }, {
		course: getcourse || null
	});
}

exports.delete = async (_id) => {
	let student = await Student.findById({ _id }).populate('user');
	await require('./users').delete(student.user._id);
	await Student.deleteOne({ _id });
	return;
}

