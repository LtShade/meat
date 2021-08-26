const express = require("express");
const Primary = require("../models/primary");
const User = require("../models/user");
const adminRouter = express.Router();
const authenticate = require("../authenticate");

adminRouter
	.route("/")
	.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Primary.find()
			.then((records) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(records);
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Primary.create(req.body)
			.then((record) => {
				console.log("Created record: ", record);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(record);
			})
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation not supported on /admin");
	})
	.delete(
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			Primary.deleteMany()
				.then((response) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(response);
				})
				.catch((err) => next(err));
		}
	);

adminRouter
	.route("/users")
	.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		User.find()
			.then((records) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(records);
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		User.create(req.body)
			.then((record) => {
				console.log("Created record: ", record);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(record);
			})
			.catch((err) => next(err));
	})
	.delete(
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			User.deleteMany()
				.then((response) => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(response);
				})
				.catch((err) => next(err));
		}
	);
adminRouter
	.route("/users/:userId")
	.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		User.findById(req.params.userId)
			.then((records) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(records);
			})
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		User.findByIdAndUpdate(
			req.params.userId,
			{
				$set: req.body,
			},
			{ new: true }
		)
			.then((document) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(document);
			})
			.catch((err) => next(err));
	});

module.exports = adminRouter;
