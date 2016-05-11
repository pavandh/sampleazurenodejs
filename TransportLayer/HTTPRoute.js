var businessLayer = require('../BusinessComponents/BusinessLogic');


module.exports = function (app, io, dao) {

    app.get('/GetChatMessage', function (req, res) {
        businessLayer.GetChatMessage(req, res, io);
	});

    app.get('/GetChatMessages', function (req, res) {
        businessLayer.GetChatMessages(req, res, io);
    });

    app.post('/SendChatMessage', function (req, res) {
	     var msg = req.body.message;
		 var flipUser = req.body.to[0].userid;
	//	console.log("sendchatMsg in HttpRoute==="+req+"==flipUser==="+flipUser+"===msg==="+"====="+msg);
        businessLayer.SendNotificationMessage(flipUser,msg,res);
    });
    
    app.post('/DeleteChatMessage', function (req, res) {
        businessLayer.DeleteChatMessage(req, res, io);
    });

    app.post('/SendFile', function (req, res) {
        businessLayer.SendFile(req, res, io);
    });

    app.post('/DeleteFile', function (req, res) {
        businessLayer.DeleteFile(req, res, io);
    });

    app.get('/GetFile', function (req, res) {
        businessLayer.GetFile(req, res, io);
    });

    app.get('/GetFiles', function (req, res) {
        businessLayer.GetFiles(req, res, io);
    });
 
};







