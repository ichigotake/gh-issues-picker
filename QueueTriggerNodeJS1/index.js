/**
 * キューの登録通知
 */
module.exports = function (context, myQueueItem) {
    context.log('Node.js queue trigger function processed work item', myQueueItem);

    context.bindings.outputQueueItem = myQueueItem;

    context.done();
};