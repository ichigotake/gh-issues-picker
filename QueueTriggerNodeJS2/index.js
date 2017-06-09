var Command = require('../src/Command.js');

module.exports = function (context, myQueueItem) {
    context.log('Node.js queue trigger function processed work item', myQueueItem);
    var c = new Command(
        process.env.GH_USERNAME,
        process.env.GH_TOKEN,
        process.env.SLACK_WEBHOOK_URL
    );
    c.postRandomIssues(process.env.GH_REPO, function () {
        context.done();
    });
};

