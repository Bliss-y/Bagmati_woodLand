/**
 * @Purpose = Handles all the queries that might arise for the system about Students
 */

const mongoose = require('mongoose');
const Student = require('../model/Student.js');
const Course = require('../model/Course.js');
var bang = { error: "error" };

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

exports.add = async (user, cb) => {
	const { name, email, dob, phoneNumber, address, course } = user;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, address, role: "student" });
	if (!mongoose.isValidObjectId(course)) {
		return { err: "Course does not exist" };
	}
	const student = new Student({

		user: User._id,
		course

	});
	student.save((err) => {
		if (err) {
			cb(err);
		}
	});
}

exports.edit = async (edited) => {

	const { name, email, dob, phoneNumber, address, course, _id } = edited;


	const student = await Student.findById(_id).populate('user');
	if (!student) {
		return { err: "student doesnot exist" };
	}

	const User = await require('../controller/users.js').edit({ name, email, dob, phoneNumber, address, role: "student" }, student.user._id);

	if (course == "") {
		return;
	}
	await Student.findByIdAndUpdate(_id, {
		course
	});
	return {};
}

exports.delete = async (_id) => {
	if (!mongoose.isValidObjectId(_id)) {
		return { err: "Student does not exist" };
	}
	let student = await Student.findById({ _id }).populate('user');
	await require('./users').delete(student.user._id);
	await Student.deleteOne({ _id }, (err) => {
		if (err) console.log("err");
	});
	return;
}

exports.findByCourse = async ({ course }) => {
	const students = await Student.find({ course }).populate('user');
	return students;
}

exports.checkPersonalTutor = async (module, student) => {
	if (!mongoose.isValidObjectId(module) || !mongoose.isValidObjectId(student)) {
		return { err: "either module or student does not exist" };
	}
	var tutor = await require('../model/PersonalTutorRequests').findOne({ module, student }).populate();
	return tutor;
}

exports.getPersonalTutor = async (student) => {
	if (!mongoose.isValidObjectId(student)) {
		return { err: "student does not exist" };
	}
	var tutor = await require('../model/Teacher').find({ student }).populate('user').populate('module');
	return tutor;
}