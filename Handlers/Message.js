var businessLayer = require('../BusinessComponents/BusinessLogic');

module.exports = {

    get: function (req, res) {
        res.json("Success");
    },
    post: function (req, res) {
        //businessLayer.SendNotificationMessage(req.body.to, req.body.Message, res);
      
     //res.json("Success======" + req.body.name + "======" + req.body.title + "====" + req.body.tags[0].attachment_title);
        //res.json("Success======");
        businessLayer.SendNotificationMessage(req, res);

    }
};