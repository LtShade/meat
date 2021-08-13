const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const adminRouter = express.Router();

adminRouter
	.route("/")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res) => {
		res.end("GET operation supported on /addmin");
	})
	.post((req, res) => {
		res.end(
			`Will add the addmin: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operation supported on /addmin");
	})
	.delete((req, res) => {
		res.end("Delete addmins");
	});

module.exports = adminRouter;
