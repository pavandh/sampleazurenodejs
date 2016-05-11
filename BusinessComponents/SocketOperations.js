var userslist = {};
var chatrooms = {};
var connections = {};

console.log('Implementation loaded');

var userDetails = require('../Models/UserDetails');

var implemActions = module.exports = {
    SetUserID: function (data, socket, io) {
        try {
            var isuserexist = userslist[data.userid];
            if (isuserexist == undefined) {
                console.log(data.userid);
                socket.userid = data.userid;
                var newObj = new userDetails.user(data.userid, socket.id);
                console.log("User Data " + newObj.displayname + "============" + newObj.socketid);
                userslist[data.userid] = newObj;
                connections[data.userid] = socket;

            } else {
                userslist[data.userid].socketid = socket.id;
            }
            socket.broadcast.emit('userslist', { onlineusers: userslist });
        } catch (err) {
            console.log('-----------' + err);
        }
    },
    Onlineusers: function (data, socket, io) {
        try {
            socket.emit('userslist', {
                onlineusers: userslist
            });
        } catch (err) {
            console.log('-----------' + err);
        }
    },
    CreateRoom: function CreateRoom(data, socket, io) {
        try {
            if (userslist[data.flipuserid] != undefined && userslist[data.flipuserid].socketid != undefined) {

                var newchatroomobj = new userDetails.chatroom(data.roomid);
                newchatroomobj.users[data.userid] = userslist[data.userid];
                newchatroomobj.usercount = 1;
                chatrooms[data.roomid] = newchatroomobj;
                socket.join(data.roomid);


                var data = {
                    "userID": data.userid,
                    "roomid": data.roomid
                };
                console.log(data.roomid + " challenged " + data.userid);

                socket.broadcast.emit('receiveChallenge', data);

            }

        } catch (err) {
            console.log(err.message);
        }
    },
    RequestJoinRoom: function RequestJoinRoom(data, socket, io) {
        try {
            console.log("****join room request**********" + connections[data.flipuserid] + "====" + data.flipuserid + "===" + data.roomid + "==" + data.userid);
            connections[data.flipuserid].emit('joinroomrequest', {
                roomid: data.roomid,
                flipuserid: data.userid,
                userid: data.flipuserid
            });
        } catch (err) {
            console.log(err.message);
        }
    },
    JoinRoom: function JoinRoom(data, socket, io) {
        console.log('user id' + data.userid + 'chat room id' + data.roomid);
        try {
            chatrooms[data.roomid].users[data.userid] = userslist[data.userid];
            chatrooms[data.roomid].usercount++;
            socket.join(data.roomid);
            io.sockets.emit('successjoinroom', data);
        } catch (err) {
            console.log(err.message);
        }
    },
    SendRoomMessage: function SendRoomMessage(data, socket, io) {
        try {
            io.sockets.in(data.roomid).emit('roommessage', {
                datetime: data.datetime,
                message: data.message,
                sentuserid: data.userid,
                inviteuser: data.inviteuser,
                roomid: data.roomid
            });
            console.log("*****" + data.datetime);
        } catch (err) {
            console.log(err.message);
        }
    },

    SendNotificationMessage: function sendNotificationMessage(flipUser, msg,res) {
        try {
			console.log("send notification called in socketOprs");
            console.log("to===" + flipUser + "=========msg========" + msg);

            target = connections[flipUser];
            if (target) {
                connections[flipUser].emit('Notification', msg);
                res.send(200);
            } else {
               res.send(404);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    },


    LogOut: function logOut(data, socket, io) {

        try {

            if (data.roomid != '') {
		        delete chatrooms[data.roomid].users[data.userid];
                console.log('chatroom user deleted' + data.userid);
            }

            if (connections[data.userid] != undefined) {
                delete connections[data.userid];
                console.log('connection deleted' + data.userid);
            }
         

            if (userslist[data.userid] != undefined) {
                delete userslist[data.userid];
                console.log('log out' + data.userid)

            }



            socket.disconnect();
        }
        catch (err) {
            console.log(err.message);
        }

    },

    ChatRoomUsers: function chatRoomUsers(data, socket, io) {
        console.log('chatRoomUsers');
        try {
            io.sockets.emit('getchatroomusers', chatrooms[data.roomid].users);
        } catch (err) {
            console.log(err.message);
        }
    }

};



