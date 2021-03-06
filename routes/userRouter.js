const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const authenticate = require("../authenticate");
const userRouter = express.Router();

//Simple testing.
userRouter.get("/", (req, res, next) => {
	res.send("respond with a resource");
});

userRouter.post("/signup", (req, res) => {
	User.register(
		new User({ username: req.body.username }),
		req.body.password,
		(err, user) => {
			if (err) {
				res.statusCode = 500;
				res.setHeader("Content-Type", "application/json");
				res.json({ err: err });
			} else {
				user.save((err) => {
					if (err) {
						res.statusCode = 500;
						res.setHeader("Content-Type", "application/json");
						res.json({ err: err });
						return;
					}
					passport.authenticate("local")(req, res, () => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({ success: true, status: "Registration Successful!" });
					});
				});
			}
		}
	);
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
	const token = authenticate.getToken({ _id: req.user._id });
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.json({
		success: true,
		token: token,
		status: "You are successfully logged in!",
	});
});

userRouter.get("/logout", (req, res, next) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie("session-id");
		res.redirect("/");
	} else {
		const err = new Error("You are not logged in!");
		err.status = 401;
		return next(err);
	}
});

module.exports = userRouter;
