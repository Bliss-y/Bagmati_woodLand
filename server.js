/**
 * Main router page
 */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const fs = require("fs");
const session = require("express-session");
const users = require('./testData');

const upload = multer();

const app = express();

const url = 'mongodb+srv://bliss:2eRYfCRdRuVMXi7M@woodland.pfprl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';



mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;


// parse all the request with body-parser

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
	name: 'UserSess',
	resave: false,
	saveUninitialized: false,
	secret: 'mySecret',
	cookie: {
		maxAge: 60 * 60 * 2 * 1000,
		sameSite: true,
		secure: false
	}
}));


// load routes

app.use('/', require('./server/routes/router'));

app.use('/fileget', express.static("./testUploads/"));


app.use('/', express.static(__dirname + '/views/include'));



// use ejs to generate html instead of writing html manually for all pages
app.set("view engine", "ejs");
app.set("views", [path.resolve(__dirname, "views"), path.resolve(__dirname, "views/admin"), path.resolve(__dirname, "views/teacher"), path.resolve(__dirname, "views/student")]);

// loat all assets with middleware

// app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
// app.use('/css', express.static(path.resolve(__dirname, "assets/js")));
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")));


app.listen(3000, () => {
	console.log("App Started");
});

