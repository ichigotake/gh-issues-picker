require('dotenv').config();
var Command = require('./src/Command.js');

var c = new Command(
    process.env.GH_USERNAME,
    process.env.GH_TOKEN,
    process.env.SLACK_WEBHOOK_URL
);
c.postRandomIssues(process.env.GH_REPO, function () {});

