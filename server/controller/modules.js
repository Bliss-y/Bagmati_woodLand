const Module = require('../model/Module.js');
const Course = require('../model/Course');


exports.find = async (_id, course) => {
	if (course != undefined) {
		console.log("HERE")
		const courseID = await require('../controller/courses.js').find(course);
		const modules = await Module.find({ course: courseID }).populate('course');
		return modules;
	}
	else if (_id != undefined) {

		return await Module.findById(_id).populate('course');
	}
	const modules = await Module.find({}).populate('course');
	return modules;
}

exports.add = async (data, course) => {
	const { name, duration, description, credit } = data;
	const Course = await require('../controller/courses').find(course);
	const module = new Module({
		name,
		duration,
		description,
		credit,
		course: Course._id
	});
	await module.save();
	return module;
}

exports.delete = async (_id) => {
	return await Module.findByIdAndDelete(_id);
}

exports.edit = async (data, _id) => {
	const { name, duration, description, credit } = data;
	const module = await Module.findByIdAndUpdate(_id, {
		name,
		duration,
		description,
		credit
	})

	return module;
}