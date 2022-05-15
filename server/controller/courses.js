const Course = require('../model/Course.js');

exports.find = async (name) => {
	return await Course.findOne({ name }).populate();
}

exports.add = async ({ name, duration }) => {
	const course = await new Course({
		name,
		duration
	});
	course.save();
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


