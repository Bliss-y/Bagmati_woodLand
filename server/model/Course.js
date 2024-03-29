const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	duration: Number,
	description: String

}, { versionKey: false })

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;