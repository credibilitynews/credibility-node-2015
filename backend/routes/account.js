'use strict';

import express from 'express';
var router = express.Router();
import passwordless from 'passwordless';
import User from '../services/user-service';

/* GET logout. */
router.get('/logout', passwordless.logout( {successFlash: 'Hope to see you soon!'} ),
	function(req, res) {
  res.redirect('/account/login');
});

/* POST login screen. */
router.post('/sendtoken',
	// Input validation
	function(req, res, next) {
		req.checkBody('user', 'Please provide a valid email address').isLength(1,200).isEmail();
		req.sanitize('user').toLowerCase();
		req.sanitize('user').trim();

		var errors = req.validationErrors(true);
		if (errors) {
			req.flash('validation', errors);
			res.redirect('/account/login');
		} else {
			next();
		}
	},
	// Request token
	passwordless.requestToken(
		function(email, delivery, callback) {
			User
            .findOrCreateUser(email)
            .then(function(user) {
				console.log(user);
				callback(null, user.id);
			})
            .catch(function(error){
				console.log(error)
                if(error) {
					callback(error.toString());
				}
            })
		}, { failureRedirect: '/account/login',
				failureFlash: 'We had issues sending out this email... Could you try it at a later moment?',
				successFlash: 'You should have an email in your inbox in a couple of seconds...!' }),

	function(req, res) {
  		res.redirect('/account/login');
});

module.exports = router;
