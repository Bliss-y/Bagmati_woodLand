/**
 * @Purpose = Handles all the queries that might arise for the system about teachers
 */

const Module = require('../model/Module.js');
const Teacher = require('../model/Teacher.js');

exports.find = async (_id) => {
	if (!_id) {
		const teachers = await Teacher.find({}).populate('user').populate('module', 'name').populate('module');

		return teachers;
	}
	const teachers = await Teacher.findById(_id).populate('user').populate('module');
	return teachers;
}

exports.add = async (user) => {

	const { name, email, dob, phoneNumber, address, role, module } = user;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, address, role });

	const teacher = new Teacher({

		user: User._id,
		module

	})
	await teacher.save();
}

exports.edit = async (edited) => {

	const { name, email, dob, phoneNumber, address, salary, module } = edited;
	const User = await require('../controller/users.js').edit({ name, email, dob, phoneNumber, address, role: "student" });
	const teacher = teacher.findByIdAndUpdate({ _id }, {
		salary,
		module
	});

}

exports.getID = async (uid) => {
	const teacher = await Teacher.findOne({ user: uid }).populate('module');
	return teacher;
}

exports.delete = async (_id) => {
	let teacher = await Teacher.findById({ _id }).populate('user');
	await require('./users').delete(teacher.user._id);
	await Teacher.deleteOne({ _id });
	return;
}
