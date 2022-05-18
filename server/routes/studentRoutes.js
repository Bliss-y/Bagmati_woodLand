const express = require('express');
const route = express.Router();
const renders = require('../services/render');
const sessionControl = require('../controller/sessionControl');
const postReqs = require('../services/postReqs');


route.get('/', (req, res) => {
	res.send('hello student');
})

module.exports = route;