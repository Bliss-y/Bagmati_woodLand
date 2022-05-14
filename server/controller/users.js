const User = require('../model/User.js');
const moment = require('moment');

exports.findAll = () => {
	const data = require('../../testData');
	for (let d in data) {
		delete data[d]['pass'];
	}

	return data;
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

exports.add = ({ name, email, dob, phoneNumber }, cb) => {
	var v;
	const d = moment(dob).format('YYYY-MM-DD');
	console.log('nuser');
	User.findOne({}).limit(1).sort({ $natural: -1 }).exec((err, data) => {
		if (err) {
			console.log('err');
		}
		console.log('nuser');
		let lastuid;
		if (!data) {
			lastuid = 1000;
		} else {
			lastuid = data.uID;
		}
		const nuser = new User({
			name,
			email,
			d,
			phoneNumber,
			role: 'student',
			uID: lastuid + 1
		});
		console.log('nuser');
		nuser.save();


		console.log(nuser._id);
		v = nuser;
		cb(nuser, CountQueuingStrategy);

	});

	return v;

}

