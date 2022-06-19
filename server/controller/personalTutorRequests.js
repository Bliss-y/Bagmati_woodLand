/**
 * @Purpose = Handles all the queries that might arise for the system about Personal Student/Tutor
 */

const mongoose = require('mongoose');
const Request = require('../model/PersonalTutorRequests');
const student = require('./students');
const teacher = require('./teachers');

exports.add = async (student, teacher, module) => {
	if (!mongoose.isValidObjectId(student)) {
		return;
	}
	let request = new Request(
		{
			student,
			teacher,
			module
		}
	);
	request.save((err) => {
		if (err) {
			return;
		}
	});
}

exports.accept = async (_id) => {
	let request = await Request.findById(_id).populate();
	console.log(request);
	await require('../model/Teacher').findByIdAndUpdate(request.teacher, {
		personalStudentId: request.student
	});
	await exports.delete(_id);
}

exports.delete = async (_id) => {
	await Request.findByIdAndRemove(_id);
}

exports.find = async (filter) => {
	let requests = await Request.find(filter).populate();
	let data = [];
	for (let i = 0; i < requests.length; i++) {
		data.push(await exports.parse(requests[i]));
	}
	return data;
}

exports.parse = async (request) => {
	let tempStudent = await student.find(request.student);
	let tempTeacher = await teacher.find(request.teacher);
	return {
		_id: request._id,
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