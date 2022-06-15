/**
 * @Purpose = Handles all the queries that might arise for the system about teachers
 */

const Module = require('../model/Module.js');
const Teacher = require('../model/Teacher.js');
const mongoose = require('mongoose');

exports.find = async (_id) => {
	if (!_id) {
		const teachers = await Teacher.find({}).populate('user').populate('module', 'name').populate('module');

		return teachers;
	}
	if (!mongoose.isValidObjectId(_id)) {
		return { err: "Teacher doesnot exist" };
	}
	const teachers = await Teacher.findById(_id, (err, data) => { if (err) { console.log('err') } }).populate('user').populate('module');
	return teachers;
}

exports.findByModule = async (module) => {
	if (!mongoose.isValidObjectId(module)) {
		return { err: "Module doesnot exist" };
	}
	const teachers = await Teacher.find({ module }).populate('user').populate('module');
	console.log(teachers);
	return teachers;
}


exports.getAvailableTeachers = async (module) => {
	if (!mongoose.isValidObjectId(module)) {
		return { err: "Module doesnot exist" };
	}
	let teachers = await Teacher.find({ module: module }).populate('user').populate('module');
	console.log(teachers);
	for (let i in teachers) {
		if (teachers.personalstudentId != undefined) {
			teachers.splice(i);
		}
	}
	return teachers;
}

exports.removeModule = async (module) => {
	if (!mongoose.isValidObjectId(module)) {
		return { err: "Module doesnot exist" };
	}
	const teachers = await Teacher.find({ module }).populate();
	for (let i = 0; i < teachers.length; i++) {
		await Teacher.findByIdAndUpdate(teachers[i]._id, { module: undefined });
	}
}

exports.add = async (user) => {


	const { name, email, dob, phoneNumber, address, role, module } = user;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, address, role });
	let teacher;
	if (role == "admin" || module == "none") {
		teacher = new Teacher({
			user: User._id,
		})
	}
	else {
		if (!mongoose.isValidObjectId(module)) {
			return { err: "Module doesnot exist" };
		}

		teacher = new Teacher({
			user: User._id,
			module

		})
	}
	await teacher.save();
	return {};
}

exports.edit = async (edited) => {

	const { name, email, dob, phoneNumber, address, salary, module, _id, role } = edited;
	if (!mongoose.isValidObjectId(_id)) {
		console.log('here');
		return { err: "Teacher does not exist" };
	}


	const teacher = await Teacher.findById(_id).populate('user');
	if (!teacher) {
		return { err: "Teacher does not exist" };
	}


	await require('../controller/users').edit({ name, email, dob, phoneNumber, address, role }, teacher.user._id);

	if (role == "admin" || module == "none") {
		await Teacher.findByIdAndUpdate(_id, {
			salary
		});
	}


	if (!mongoose.isValidObjectId(module)) {
		return { err: "Module id Error" };
	}


	await Teacher.findByIdAndUpdate(_id, {
		salary,
		module
	});

	return {};
}

exports.getID = async (uid) => {
	const teacher = await Teacher.findOne({ user: uid }).populate('module');
	return teacher;
}

exports.delete = async (_id) => {
	if (!mongoose.isValidObjectId(_id)) {
		return { err: "notValidObjectId" };
	}
	let teacher = await Teacher.findById({ _id }).populate('user');
	await require('./users').delete(teacher.user._id);
	await Teacher.deleteOne({ _id });
	return;
}
