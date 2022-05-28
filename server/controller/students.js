/**
 * @Purpose = Handles all the queries that might arise for the system about Students
 */

const mongoose = require('mongoose');
const Student = require('../model/Student.js');
const Course = require('../model/Course.js');

exports.find = async (id) => {
	if (!id) {
		const students = await Student.find({}).populate('user').populate('course');

		return students;
	}
	const students = await Student.findById(id).populate('user').populate('course');
	return students;
}

exports.getID = async (uid) => {
	const student = await Student.findOne({ user: uid }).populate('course');
	return student;
}


exports.add = async (user) => {
	const { name, email, dob, phoneNumber, address, course } = user;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, address, role: "student" });


	const student = new Student({

		user: User._id,
		course

	})
	await student.save();
}

exports.edit = async (edited) => {

	const { name, email, dob, phoneNumber, address, course, _id } = edited;
	const User = await require('../controller/users.js').edit({ name, email, dob, phoneNumber, address, role: "student" });

	const student = Student.findByIdAndUpdate({ _id }, {
		course

	});
}

exports.delete = async (_id) => {
	let student = await Student.findById({ _id }).populate('user');
	await require('./users').delete(student.user._id);
	await Student.deleteOne({ _id });
	return;
}

exports.findByCourse = async ({ course }) => {
	const students = await Student.find({ course }).populate('user');
	return students;
}
