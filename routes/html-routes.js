// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');

// Routes
// =============================================================
module.exports = function(app) {
	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get('/signup', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/signup.html'));
	});
	app.get('/login', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/login.html'));
	});
	app.get('/home', function(req, res) {
		if (req.user) {
			res.sendFile(path.join(__dirname, '../public/home.html'));
		} else {
			res.sendFile(path.join(__dirname, '../public/login.html'));
		}
	});
};
