const express = require("express");
const sampleRouter = express.Router();

sampleRouter
	.route("/")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})
	.get((req, res) => {
		res.end("Return GET");
	})
	.post((req, res) => {
		res.end(
			`Will add the sample: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operation supported on /sample");
	})
	.delete((req, res) => {
		res.end("Delete samples");
	});

sampleRouter
	.route("/:sampleId")
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");
		next();
	})

	.get((req, res) => {
		res.end(`Will send details of the sample: ${req.params.sampleId} to you`);
	})

	.post((req, res) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /samples/${req.params.sampleId}`);
	})

	.put((req, res) => {
		res.write(`Updating the sample: ${req.params.sampleId}\n`);
		res.end(`Will update the sample: ${req.body.name}
        with description: ${req.body.description}`);
	})

	.delete((req, res) => {
		res.end(`Deleting sample: ${req.params.sampleId}`);
	});

module.exports = sampleRouter;
