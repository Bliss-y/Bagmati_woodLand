/**
 * @Purpose = Handles all the queries that might arise for the system about Users
 */

const User = require('../model/User.js');
const moment = require('moment');
const bcrypt = require('bcrypt');

exports.dataBaseEmpty = async () => {
	const data = await User.estimatedDocumentCount();
	if (data == 0) {
		return true;
	}

	else return false;
}

exports.getAdmins = async () => {
	return await User.find({ role: "admin" }).populate();
}

exports.verify = async (id, password) => {
	const uID = parseInt(id);
	const user = await User.findOne({ uID }).populate('user');
	if (!user) {
		return null;
	}
	if (await bcrypt.compare(password, user.password)) {
		return user;
	}
}

exports.find = async ({ _id, uID }) => {
	if (_id == undefined) {
		return await User.findOne({ uID }).populate();
	}
	const user = await User.findById(_id).populate();
	return user;
}

exports.add = async ({ name, email, dob, phoneNumber, role, address }) => {
	var v;
	data = await User.findOne({}).limit(1).sort({ $natural: -1 }).populate();
	password = name;
	try {
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);
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
	await nuser.save((err) => {
		console.log(err);
	});
	return nuser;
}

exports.edit = async (edited, _id) => {

	await User.findByIdAndUpdate(_id, {
		name,
		email,
		phoneNnumber,
		address,
		dob
	} = edited);
}

exports.delete = async (_id) => {
	await User.deleteOne({ _id });
}

exports.parseUsers = (users, type) => {
	let data = [];
	for (let x in users) {
		var keys = Object.keys(users[x].user.toJSON());
		var personalKeys = Object.keys(users[x].toJSON());
		var me = {};
		for (let i in keys) {
			if (keys[i] != '_id' && keys[i] != 'password') {
				me[keys[i]] = users[x].user[keys[i]];
			}
		}

		for (let i in personalKeys) {
			if (personalKeys[i] != 'user' && personalKeys[i] != 'dob') {
				me[personalKeys[i]] = users[x][personalKeys[i]];
			}
		}
		var hi = moment(me.dob).format('YYYY-MM-DD');
		me.dob = hi;
		if (type == 'teachers' && users[x].module != null) {
			me.module = users[x].module.name;
		}
		data.push(me);
	}
	return data;

}