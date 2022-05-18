const Module = require('../model/Module.js');
const Teacher = require('../model/Teacher.js');

exports.find = async (_id) => {
	if (!_id) {
		const teachers = await Teacher.find({}).populate('user').populate('module', 'name');

		return teachers;
	}
	const teachers = await Teacher.findById(_id).populate('user');
	return teachers;
}

exports.add = async (user) => {

	const { name, email, dob, phoneNumber, address, role } = user;
	const User = await require('../controller/users.js').add({ name, email, dob, phoneNumber, address, role });
	const getModule = await require('../controller/modules.js').find(user.module);

	const teacher = new Teacher({

		user: User._id,
		module: getModule || null

	})
	await teacher.save();
}

exports.edit = async (edited) => {

	const { name, email, dob, phoneNumber, address, salary, module } = edited;
	const User = await require('../controller/users.js').edit({ name, email, dob, phoneNumber, address, role: "student" });
	const getModule = await require('../controller/modules.js').find(module)._id || null;
	const teacher = teacher.findByIdAndUpdate({ _id }, {
		salary,
		module: getModule || null,
	});

}

exports.getID = async (uid) => {
	const teacher = await Teacher.findOne({ user: uid }).populate();
	return student;
}

exports.delete = async (_id) => {
	let teacher = await Teacher.findById({ _id }).populate('user');
	await require('./users').delete(teacher.user._id);
	await Teacher.deleteOne({ _id });
	return;
}
