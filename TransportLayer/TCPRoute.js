// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Use the gravatar module, to turn email addresses into avatar images:

//var gravatar = require('gravatar');
var businessLayer = require('../BusinessComponents/BusinessLogic');


var messages='';
// Export a function, so that we can pass 
// the app and io instances from the app.js file:

module.exports = function (app, io, dao) {
    io.sockets.on('connection', function (socket) {

        socket.on('setuserid', function (data) {
            businessLayer.SetUserID(data, socket, io);
        });

        socket.on('onlineusers', function (data) {
            businessLayer.Onlineusers(data, socket, io);
        });

        socket.on('createroom', function (data) {
            businessLayer.CreateRoom(data, socket, io);
        });

        socket.on('requestjoinroom', function (data) {
            console.log("***********requestjoinroom in TCPROUTE***********" + data.userid);
            businessLayer.RequestJoinRoom(data, socket, io);
        });

        socket.on('joinroom', function (data) {
            businessLayer.JoinRoom(data, socket, io);
        });

        socket.on('sendroommessage', function (data) {
            businessLayer.SendRoomMessage(data, socket, io, dao);
        });
		socket.on('logout', function (data) {
            businessLayer.LogOut(data, socket, io);
        });
		socket.on('chatroomusers',function(data){
           businessLayer.ChatRoomUsers(data,socket,io);
       });
    });
}


