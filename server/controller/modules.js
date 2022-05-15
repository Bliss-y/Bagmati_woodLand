const Module = require('../model/Module.js');


exports.find = async (name) => {
	return await Module.findOne({ name }).populate();
}