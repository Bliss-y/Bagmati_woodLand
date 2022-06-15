const mongoose = require('mongoose');
const users = require('../server/controller/users');
const students = require('../server/controller/students');
const teachers = require('../server/controller/teachers');
const courses = require('../server/controller/courses');
const announcements = require('../server/controller/announcements');
const logs = require('../server/controller/logs');
const assignments = require('../server/controller/assignments');
const axios = require('axios');


const DEFAULT_NAME = "DUMMY "
const DEFAULT_DATE = Date.now();
const DEFAULT_ADDRESS = "DUMMY ADDRESS "
const DEFAULT_EMAIL = "DUMMY ADDRESS "
const DEFAULT_PHONENUMBER = "NUMBER "
const DEFAULT_DESCRIPTION = "DESCRIPTION FOR "


const URL = "http://localhost:3000/"
const dev_uiD_admin = 1001;
const dev_pass_admin = "Admin init"


exports.addStudents = async (number) => {
	let statuses = [];
	let course = await courses.find();
	let courseNum = course.length;
	let a = 0;
	for (let i = 0; i < courseNum; i++) {
		for (let j = 0; j < number; j++) {
			a++;
			let res = await axios({
				method: 'post',
				url: URL + "admin/adduser/students",
				headers: {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				},
				data: { name: DEFAULT_NAME + "STUDENT " + a, address: DEFAULT_ADDRESS + a, dob: DEFAULT_DATE, email: DEFAULT_EMAIL + a, phoneNumber: DEFAULT_PHONENUMBER + a, course: course[i]._id, dev_uiD: dev_uiD_admin, dev_pass: dev_pass_admin }
			})
			statuses.push({
				title: "Adding Student " + DEFAULT_NAME + "STUDENT " + j,
				status: res
			});
		}
	}
	return statuses;
}

