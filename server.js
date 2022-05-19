/**
 * Main router page
 * @purpose  Listens to all the requests and sends them to appropriate functions
 */

const express = require("express");
const sessionControl = require('./server/controller/sessionControl');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const fs = require("fs");
const session = require("express-session");
const users = require('./testData');
const sessions = require('./server/controller/sessionControl');

const upload = multer();

const app = express();

/**
 * @TODO Use different file to handle mongo connection also store environment variable 
*/

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


app.use('/admin/', sessions.notLogged, require('./server/routes/adminRoutes'));
app.use('/teacher/', sessions.notLogged, require('./server/routes/teacherRoutes'));
app.use('/student/', sessions.notLogged, require('./server/routes/studentRoutes'));
app.use('/', require('./server/routes/router'));

app.use('/fileget', express.static("./testUploads/"));


app.use('/', express.static(__dirname + '/views/include'));



// use ejs to generate html instead of writing html manually for all pages
app.set("view engine", "ejs");
app.set("views", [path.resolve(__dirname, "views"), path.resolve(__dirname, "views/admin"), path.resolve(__dirname, "views/teacher"), path.resolve(__dirname, "views/student")]);



app.listen(3000, () => {
	console.log("App Started");
});

