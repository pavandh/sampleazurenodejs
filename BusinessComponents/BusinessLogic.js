var socketOpers = require('./SocketOperations');
//var dbOpers = require('./DBOperations');
var fileOpers = require('./FileOperations');

var businessLogic = module.exports = {
    SetUserID: function (data, socket, io) {
        socketOpers.SetUserID(data, socket, io);
    },
    Onlineusers: function (data, socket, io) {
        socketOpers.Onlineusers(data, socket, io);
    },
    CreateRoom: function (data, socket, io) {
        socketOpers.CreateRoom(data, socket, io);
    },
    RequestJoinRoom: function (data, socket, io) {
        socketOpers.RequestJoinRoom(data, socket, io);
    },
    JoinRoom: function (data, socket, io) {
        socketOpers.JoinRoom(data, socket, io);
    },
    SendRoomMessage: function (data, socket, io, dao) {
        socketOpers.SendRoomMessage(data, socket, io);
      //  dbOpers.SendChatMessage(data, dao);
    },
    DeleteRoomMessage: function (data, socket, io) {

    },
    SendNotificationMessage: function (flipUser, msg,res)
    {
		console.log("send notification called in BusinessLogic");
        socketOpers.SendNotificationMessage(flipUser, msg,res);
    },
   LogOut:function(data, socket, io){
    socketOpers.LogOut(data, socket, io);
   },
   ChatRoomUsers:function(data, socket, io){
    socketOpers.ChatRoomUsers(data, socket, io);
   }
}