const User = require('../model/User.js');
const moment = require('moment');
const bcrypt = require('bcrypt');

exports.findAll = () => {
	const data = require('../../testData');
	for (let d in data) {
		delete data[d]['pass'];
	}

	return data;
}


exports.verify = (id, password) => {
	const user = User.findOne({ uID: id }).populate();
	if (!user) {
		return null;
	}
	if (bcrypt.compare(password, user.password)) {
		return user;
	}
}

exports.find = (userId, password) => {
	const data = require('../../testData');
	if (password) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].uid == userId && data[i].pass == password) {
				return data[i];
			}
		}
	}

	if (!password) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].uid == userId) {
				return data[i];
			}
		}
	}
	return null;
}

exports.add = async ({ name, email, dob, phoneNumber, role, address }) => {
	var v;
	data = await User.findOne({}).limit(1).sort({ $natural: -1 }).populate();
	password = name;
	try {
		const salt = await bcrypt.genSalt(10);
		console.log(salt);
		password = await bcrypt.hash(password, salt);
		console.log(password);
	} catch {
		return console.log("err");
	}

	let lastuid;
	if (!data) {
		lastuid = 1000;
	} else {
		lastuid = data.uID;
	}
	const nuser = new User({
		name,
		email,
		dob: moment(dob).format('YYYY-MM-DD'),
		password,
		address,
		phoneNumber,
		role,
		uID: lastuid + 1
	});
	console.log(nuser)
	await nuser.save();
	return nuser;
}

exports.edit = async (edited, _id) => {
	return User.findOneAndUpdate({ _id }, {
		name: edited.name,
		email: edited.email,
		phoneNnumber: edited.phoneNumber,
		address: edited.address,
		dob: edited.dob
	}, { new: true });
}

exports.delete = async (_id) => {
	await User.deleteOne({ _id });
}