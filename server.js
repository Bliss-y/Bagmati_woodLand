/**
 * Main router page
 */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const url = 'mongodb+srv://bliss:<password>@woodland.pfprl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrkParser: true });

const db = mongoose.connection;


// parse all the request with body-parser

app.use(bodyParser.urlencoded({ extended: true }));



// test
app.get("/", (req, res) => {
	res.render("index");
});

// test

// use ejs to generate html instead of writing html manually for all pages
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, ""))

// loat all assets with middleware

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/css', express.static(path.resolve(__dirname, "assets/js")));
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")));


app.listen(3000, () => {
	console.log("App Started");
});