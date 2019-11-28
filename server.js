"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/slack-salesforce-auth'),
    whoami = require('./modules/whoami'),
    actions = require('./modules/actions'),
    app = express();

app.enable('trust proxy');

app.set('port', process.env.PORT || 3002);

app.use('/', express.static(__dirname + '/www'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/addTicket', actions.addTicket);
app.post('/whoami', whoami.execute);
app.post('/login', auth.loginLink);
app.post('/logout', auth.logout);
app.get('/login/:slackUserId', auth.oauthLogin);
app.get('/oauthcallback', auth.oauthCallback);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});