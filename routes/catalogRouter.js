const express = require("express");
const Primary = require("../models/primary");
const catalogRouter = express.Router();
const authenticate = require("../authenticate");

catalogRouter
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
	.post(authenticate.verifyUser, (req, res, next) => {
		Primary.create(req.body)
			.then((record) => {
				console.log("Created record: ", record);
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(record);
			})
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser, (req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation supported on /catalog");
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		res.statusCode = 403;
		res.end("PUT operation supported on /catalog");
	});

catalogRouter
	.route("/:catalogId")
	.get(authenticate.verifyUser, (req, res, next) => {
		Primary.findById(req.params.catalogId)
			.then((records) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(records);
			})
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		Primary.findByIdAndUpdate(
			req.params.catalogId,
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

module.exports = catalogRouter;
