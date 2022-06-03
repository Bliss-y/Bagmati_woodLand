/**
 * @Purpose = Handles all the queries that might arise for the system about Courses
 */

const Course = require('../model/Course.js');

exports.find = async (_id) => {
	if (!_id) {
		const course = await Course.find({}).populate();
		return course;
	}
	const course = await Course.findById(_id).populate();
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

exports.delete = async (_id) => {
	await Course.findByIdAndDelete(_id);
}

exports.edit = (_id, { name, duration }) => {
	Course.findByIdAndUpdate({ _id }, {
		name,
		duration
	})
}

