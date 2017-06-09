var request = require('request');

class Command {

    constructor(ghUserName, ghPassword, slackWebHookUrl) {
        this.ghUserName = ghUserName;
        this.ghPassword = ghPassword;
        this.slackWebHookUrl = slackWebHookUrl;
    }

    
    postRandomIssues(repo, next) {
        var callback = function (number) {
            this.postSlack('<https://github.com/' + repo + '/issues/' + number + '>');
            next();
        };
        this.getRandomIssueNumber(repo, callback.bind(this));
    }

    getRandomIssueNumber(repo, next) {
        var options = {
            url: 'https://api.github.com/repos/' + repo + '/issues',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'gh-issues-picker',
            },
            auth: {
                'username': this.ghUserName,
                'password': this.ghPassword,
            },
        }
        request(options, function(error, response, body) {
            if (error) {
                next(0);
                return;
            }
            var issues = JSON.parse(body);
            if (issues.length === 0) {
                next(0);
            }
            var number = Math.floor( Math.random() * issues[0].number );
            next(number);
        });
    }

    postSlack(text) {
        var options = {
            uri: this.slackWebHookUrl,
            headers: {
                "Content-type": "application/json",
            },
            json: {
                "text": text,
            },
        };
        request.post(options);
    }

}

module.exports = Command;

