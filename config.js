
var config = {};

config.host = process.env.HOST || "https://vm-ab-demo-ddb.documents.azure.com/";
config.authKey = process.env.AUTH_KEY || "RHv8nJdDJlscVIR9lyRkl6AHll9vfmVxG8EZVnVsbYtTfM9dlbsdKAnlnsjVfIkHKwe0gWvx21BqteSEDkOQCg==";
config.databaseId = "demochat";
config.collectionId = "demochatcollection";

module.exports = config;