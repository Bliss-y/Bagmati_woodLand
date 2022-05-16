const Course = require('../model/Course.js');

exports.find = async (name) => {
	if (!name) {
		return await Course.find({}).populate();
	}

	return await Course.findOne({ name }).populate();
}

exports.add = async ({ name, duration, description }) => {

	const course = new Course({
		name,
		duration,
		description
	});
	await course.save();
	return course;
}

exports.delete = (name) => {
	Course.findOneAndDelete({ name });
}

exports.edit = (_id, { name, duration }) => {
	Course.findByIdAndUpdate({ _id }, {
		name,
		duration
	})
}

exports.addModule = async ({ name, module }) => {
	const course = Course.findOne({ name },)
}
