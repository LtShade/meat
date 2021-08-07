const express = require("express");
const morgan = require("morgan");
const sampleRouter = require("./routes/sampleRouter");

const hostname = "0.0.0.0";
const port = "8080";
//const port = process.env.SERVER_PORT;

const app = express();
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

app.use("/sample", sampleRouter);

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
