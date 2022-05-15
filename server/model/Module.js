
const mongoose = require('mongoose');

const { Schema } = mongoose;

const moduleSchema = new Schema({
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true

	},
	name: String,
	credit: Number,
	duration: Number

}, { versionKey: false })

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
