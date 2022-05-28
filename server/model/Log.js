const mongoose = require('mongoose');

const { Schema } = mongoose;

const logSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	text: String,
	date: { type: Date, default: Date.now }
}, { versionKey: false })

const Log = mongoose.model('Log', logSchema);

module.exports = Log;