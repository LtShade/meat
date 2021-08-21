const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const mongoose = require("mongoose");

//Establish routes
const adminRouter = require("./routes/adminRouter");

//Shortcut parameters into constants
const url = process.env.CONNECTIONSTRING;
const dbname = config.dbname;
const hostname = config.hostname;
const port = config.port;

//Initiate mongoose connection to Mongo database
const connect = mongoose.connect(url, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connect.then(
	() => console.log("Connected correctly to server"),
	(err) => console.log(err)
);

var app = express();
//Secure connection
app.all("*", (req, res, next) => {
	if (req.secure) {
		return next();
	} else {
		console.log(
			`Redirecting to: https://${req.hostname}:${app.get("secPort")}${req.url}`
		);
		res.redirect(
			301,
			`https://${req.hostname}:${app.get("secPort")}${req.url}`
		);
	}
});

app.use(morgan("dev"));
app.use(express.json());
//Use routes
app.use("/admin", adminRouter);

app.use(express.static(__dirname + "/public"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

app.use((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
