// This is the main file of our chat app. It initializes a new 
// express.js instance, requires the config and routes files
// and listens on a port. Start the application by running
// 'node server.js' in your terminal

var bodyParser = require('body-parser');
var express = require('express'),
app = express();
var config = require('./config');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui'); // second change
var path = require('path');


var port = process.env.PORT || 8083;
var io = require('socket.io').listen(app.listen(port));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(swaggerize({
    api: path.resolve('./apiswagger/api.json'),
    docspath: '/swagger',
    handlers: path.resolve('./Handlers')
}));

// change four
app.use('/docs', swaggerUi({
    docs: '/swagger'
}));

//DocumentDB configuration
var DocumentDBClient = require('documentdb').DocumentClient;
var TaskDao = require('./Models/TaskDao');
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
taskDao.init();

require('./TransportLayer/TCPRoute')(app, io, taskDao);
require('./TransportLayer/HTTPRoute')(app, io, taskDao);
require('./TransportLayer/HTTPRoute')(app, io, taskDao);

//console.log('Your application is running on http://localhost:' + port);