const express = require("express");
const Primary = require("../models/primary");
const adminRouter = express.Router();

adminRouter
	.route("/")
	.get((req, res, next) => {
		Primary.find()
			.then((records) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(records);
			})
			.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Primary.create(req.body)
			.then((record) => {
				console.log("Created record: ", record);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(record);
			})
			.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation supported on /admin");
	})
	.delete((req, res, next) => {
		Primary.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(response);
			})
			.catch((err) => next(err));
	});

module.exports = adminRouter;
