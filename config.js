
var config = {};

config.host = process.env.HOST || "https://vm-de-demo-ddb.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "6Wy3oAlHhm4WsEMOuszHc1Kxejyyev2zd9lCi68lZ66goPfDa5haIj0miXmCGbSikgxcdXrnvzHqY48aObmtaA==";
config.databaseId = "demochat";
config.collectionId = "demochatCollection";

module.exports = config;