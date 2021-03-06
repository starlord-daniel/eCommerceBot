module.exports = function () {

    global.restify = require('restify');
    global.builder = require('botbuilder');
    global.paypal = require('paypal-rest-sdk');
    global.url = require('url');

    //If testing via the emulator, no need for appId and appPassword. If publishing, enter appId and appPassword here 
    var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : '',
    appPassword: process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : '',
        gzipData: true
    });

    global.bot = new builder.UniversalBot(connector);

    // Setup Restify Server
    var server = restify.createServer();

    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser()); 

    server.listen(process.env.port || 3978, function () {
        console.log('%s listening to %s', server.name, server.url);
    });
    server.post('/api/messages', connector.listen());
    bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));

}