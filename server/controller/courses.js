const Course = require('../model/Course.js');

exports.find = async (name) => {
	if (!name) {
		const course = await Course.find({}).populate();
		return course;
	}
	const course = await Course.findOne({ name }).populate();
	return course;
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

