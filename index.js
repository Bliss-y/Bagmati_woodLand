const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("hey dom");
});


app.listen(3000, () => {
	console.log("App Started");
});