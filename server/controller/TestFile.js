/**
 * @Purpose = To create a testing scenario for the database system
 */


const mongoose = require('mongoose');

const users = require('./users');
const students = require('./students');
const teachers = require('./teachers');
const courses = require('./courses');
const announcements = require('./announcements');
const logs = require('./logs');
const assignments = require('./assignments');
const axios = require('axios');

var URL = "http://localhost:3000/admin/"

const DEFAULT_NAME = "DUMMY "
const DEFAULT_DATE = Date.now();
const DEFAULT_ADDRESS = "DUMMY ADDRESS "
const DEFAULT_EMAIL = "DUMMY ADDRESS "
const DEFAULT_PHONENUMBER = "NUMBER "
const DEFAULT_DESCRIPTION = "DESCRIPTION FOR "

exports.addDummyStudents = async (number) => {

	let courses = require('./courses').find();
	let courseNum = courses.length;
	for (let i = 0; i < courseNum; i++) {
		for (let j = 0; j < number; j++) {
			await students.add({ name: DEFAULT_NAME + "STUDENT " + j, address: DEFAULT_ADDRESS + j, dob: DEFAULT_DATE, email: DEFAULT_EMAIL + j, phoneNumber: DEFAULT_PHONENUMBER + j, course: courses[i]._id });
		}
	}


}

exports.addDummyStudents = async (number) => {
	let courses = require('./modules').find();
	let courseNum = courses.length;
	for (let i = 0; i < courseNum; i++) {
		for (let j = 0; j < number; j++) {
			await teachers.add({ name: DEFAULT_NAME + "TEACHER " + number, email: DEFAULT_EMAIL + number, dob: DEFAULT_DATE, phoneNumber: DEFAULT_PHONENUMBER + number, address: DEFAULT_ADDRESS + number, salary: 20000, course: courses[i]._id });
		}
	}


}

exports.addDummyCourses = async (number) => {
	while (number > 0) {
		console.log('here');
		await require('./courses').add({ name: DEFAULT_NAME + "_COURSE " + number, duration: 3, description: DEFAULT_DESCRIPTION + "_COURSE:" + number });
		--number;
	}
}


exports.addModulesForAllCourses = async (number) => {
	let courses = await require('./courses').find();
	let courseNum = courses.length;
	for (let i = 0; i < courseNum; i++) {
		console.log(`didn't add?`);
		for (let j = 0; j < number; j++) {
			await modules.add({ name: DEFAULT_NAME + "MODULE " + i + "_" + j, duration: "3", description: DEFAULT_DESCRIPTION + "_MODULE: " + number, credit: "20" }, courses[i]._id);
		}
	}

}

exports.addDummyAnnouncements = async (number) => {
	let admins = await users.getAdmins();
	let courseNum = admins.length;
	for (let i = 0; i < courseNum; i++) {
		for (let j = 0; j < number; j++) {
			console.log(i + ", " + j);
			await announcements.add({ _uid: admins[i]._id, text: "DUMMY ANNOUNCEMENT TEXT NUMBER : " + number, title: "ANNOUNCEMENT NUMBER " + number });
		}
	}
}