const mongoose = require('mongoose');
const users = require('../server/controller/users');
const students = require('../server/controller/students');
const teachers = require('../server/controller/teachers');
const courses = require('../server/controller/courses');
const announcements = require('../server/controller/announcements');
const logs = require('../server/controller/logs');
const assignments = require('../server/controller/assignments');
const modules = require('../server/controller/modules');
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


// CREATES MULTIPLE REQUESTS TO ADD STUDENTS IN ALL COURSES.
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
				data: {
					name: DEFAULT_NAME + "STUDENT " + a,
					address: DEFAULT_ADDRESS + a,
					dob: DEFAULT_DATE, email: DEFAULT_EMAIL + a,
					phoneNumber: DEFAULT_PHONENUMBER + a,
					course: course[i]._id, dev_uiD: dev_uiD_admin,
					dev_pass: dev_pass_admin
				}
			})
			statuses.push({
				title: "Adding Student " + DEFAULT_NAME + "STUDENT " + a,
				status: res
			});
		}
	}
	return statuses;
}


exports.addTeachers = async (number) => {
	let statuses = [];
	let module = await modules.find({});
	console.log(module.length);
	let a = 0;
	for (let i = 0; i < module.length; i++) {
		for (let j = 0; j < number; j++) {
			let res = await axios({
				method: 'post',
				url: URL + "admin/adduser/teachers",
				headers: {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				},
				data: {
					name: DEFAULT_NAME + "TEACHER " + a,
					address: DEFAULT_ADDRESS + a,
					dob: DEFAULT_DATE,
					email: DEFAULT_EMAIL + a,
					phoneNumber: DEFAULT_PHONENUMBER + a,
					module: module[i]._id,
					salary: "2000",
					role: "teacher",
					dev_uiD: dev_uiD_admin,
					dev_pass: dev_pass_admin
				}
			})
			statuses.push({
				title: "Adding Student " + DEFAULT_NAME + "STUDENT " + a,
				status: res
			});
		}
		a++;
	}
}

exports.addCourses = async (number) => {
	let statuses = [];
	let a = 0;
	for (let j = 0; j < number; j++) {
		a++;
		let res = await axios({
			method: 'post',
			url: URL + "admin/addcourse",
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			},
			data: {
				name: DEFAULT_NAME + "COURSE " + a,
				duration: 3,
				description: DEFAULT_NAME + "COURSE " + a + " DESCRIPTION",
				dev_uiD: dev_uiD_admin,
				dev_pass: dev_pass_admin
			}
		})
		statuses.push({
			title: "Adding course " + DEFAULT_NAME + "COURSE " + a,
			status: res
		});
	}
	return statuses;
}

exports.addModules = async (number) => {
	let statuses = [];
	let course = await courses.find();
	let courseNum = course.length;
	let a = 0;
	for (let i = 0; i < courseNum; i++) {
		for (let j = 0; j < number; j++) {
			a++;
			let url = URL + "admin/addmodule/" + course[i]._id;
			let res = await axios({
				method: 'post',
				url,
				headers: {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				},
				data: {
					name: DEFAULT_NAME + "MODULE " + a,
					duration: 30, description: course[i].name + "'s module: " + DEFAULT_NAME + "MODULE " + a + "DESCRIPTION", credit: 30,
					course: course[i]._id, dev_uiD: dev_uiD_admin,
					dev_pass: dev_pass_admin
				}
			})
			statuses.push({
				title: "Adding Student " + DEFAULT_NAME + "MODULE " + a,
				status: res
			});
		}
	}
	return statuses;
}

exports.addAnnouncements = async (number) => {
	let statuses = [];
	let course = await users.getAdmins();
	let courseNum = course.length;
	let a = 0;
	for (let i = 0; i < courseNum; i++) {
		for (let j = 0; j < number; j++) {
			a++;
			let res = await axios({
				method: 'post',
				url: URL + "admin/announce",
				headers: {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				},
				data: {
					title: DEFAULT_NAME + "ANNOUNCEMENT " + a,
					text: DEFAULT_NAME + "ANNOUNCEMENT " + a + " BY " + course[i].name + " ",
					dev_uiD: course[i].uID,
					dev_pass: course[i].name
				}
			})
			statuses.push({
				title: "Adding Announcement " + DEFAULT_NAME + "ANNOUNCEMENT " + a,
				status: res.statusText
			});
		}
	}
	return statuses;
}