/**
 * @Purpose = Handles all the queries that might arise for the system about Personal Student/Tutor
 */

const mongoose = require('mongoose');
const Request = require('../model/PersonalTutorRequests');
const student = require('./students');
const teacher = require('./teachers');

exports.add = async (student, teacher) => {
	if (!mongoose.isValidObjectId(student)) {
		return console.log('not valid student id');
	}
	let request = new Request(
		{
			student,
			teacher
		}
	);
	request.save((err) => {
		if (err) console.log("Error Adding request\n" + err);
	});
}

exports.accept = async (_id) => {
	let request = Request.findById(_id).populate();
	await require('../model/Teacher').findByIdAndUpdate(request.teacher, {
		personalStudentId: request.student
	}, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			exports.delete(_id);
		}
	});
}

exports.delete = async (_id) => {
	await Request.findByIdAndRemove(_id);
}

exports.find = async (filter) => {
	let requests = await Request.find(filter).populate();
	let data = [];
	for (let i = 0; i < requests.length; i++) {
		data.push(exports.parse(requests[i]));
	}
	return data;
}

exports.parse = async (request) => {
	let tempStudent = await student.find(request.student);
	let tempTeacher = await teacher.find(request.teacher);
	return {
		student: {
			_id: tempStudent,
			name: tempStudent.user.name,
		},
		teacher: {
			_id: tempTeacher,
			name: tempTeacher.user.name,
		},
		module: request.module
	}
}