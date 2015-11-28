import passwordless from 'passwordless';
import PostgreStore from 'passwordless-postgrestore';
import User from '../services/user-service';

import mandrill from 'mandrill-api/mandrill';
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);
mandrill_client.users.ping2({}, function(result) {
    console.log(result);
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Invalid_Key - Invalid API key
});


var emailText = function(html, token, uid) {
        var startP = function() { return (html) ? '<p>' : ''; };
        var endP = function() { return (html) ? '</p>' : '\n\n'; };
        var linkA = function(url) { return (html) ? ('<a href="' + url + '">' + url + '</a>') : url; };
        return startP() + 'Hello!' + endP() +
                    startP() + 'You have successfully set up your Credibility account' + endP() +
                    startP() + 'You can now access it by clicking on the following link:' + endP() +
                    startP() + linkA(process.env.CREDIBILITY_URL + '/?token=' + encodeURIComponent(token)
                    + '&uid=' + encodeURIComponent(uid)) + endP() +
                    startP() + 'See you soon!' + endP() +
                    startP() + 'Credibility Team' + endP();
};

module.exports = function(app) {

        passwordless.init(new PostgreStore(process.env.DATABASE_URL));

        passwordless.addDelivery(
        function(tokenToSend, uidToSend, recipient, callback) {

                var message = {
                html: emailText(true, tokenToSend, uidToSend),
                text: emailText(false, tokenToSend, uidToSend),
                subject: 'Login Token for Credibility',
                from_email: process.env.MANDRILL_API_EMAIL,
                from_name: 'Credibility',
                to: [{
                        email: recipient,
                        name: '',
                        type: 'to'
                    }],
                headers: {
                    'Reply-To': process.env.MANDRILL_API_EMAIL
                },
            };
                console.log('sending', tokenToSend, uidToSend, recipient, message);

                mandrill_client.messages.send({message: message, async: false, ip_pool: null, send_at: null},
                function(result) {
                        console.log(result);
                    // success
                    callback();
                }, function(e) {
                        var err = 'An email delivery error occurred: ' + e.name + ' - ' + e.message;
                        console.log(err);
                        callback(err);
                });
        });

        app.use(passwordless.sessionSupport());
        app.use(passwordless.acceptToken( {    successFlash: 'You are logged in. Welcome!',
                                        failureFlash: 'The supplied token is not valid (anymore). Please request another one.',
                                        successRedirect: '/account/login' } ));

    // For every request: provide user data to the view
        app.use(function(req, res, next) {
            if(req.user) {
                User.getUsers([req.user])
            .then(function(userdoc) {
                console.log(userdoc);
                                res.locals.user = userdoc[req.user];
                                next();
                        });
        } else {
                next();
        }
    });
};
