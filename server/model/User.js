const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
	name: String,
	address: String,
	phoneNumber: String,
	email: String,
	password: String,
	uID: { type: Number, unique: true, required: true },
	role: String,
	dob: Date
})

const User = mongoose.model('User', userSchema);

module.exports = User;