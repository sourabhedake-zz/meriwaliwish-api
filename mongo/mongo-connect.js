const {
  MongoClient
} = require('mongodb');
const s3 = require("../s3");
const config = require('../config');
var AsyncLock = require('async-lock');
var lock = new AsyncLock();

class Client {
  static client;
  static database;
};

var connect = async function () {
  lock.acquire("client", function () {
    var intFunction = async function () {
      if (Client.client != undefined) {
        console.log("DB > Requested DB client again - Return existing client")
        return Client;
      }

      let user = config.MONGO_USER
      let db = config.MONGO_DB

      let pass = await s3.getMongoPassword();

      var uri = "mongodb+srv://" + user + ":" + pass + "@meriwaliwish.z9nbu.mongodb.net/" + db + "?authSource=admin&retryWrites=true&w=majority";

      Client.client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      console.log("DB > Connnecting to the database...");
      try {
        await Client.client.connect();
        Client.database = Client.client.db("meriwaliwish");
        var collection = Client.database.collection("item");
        console.log("DB > Connection to the database established successfully... :)");
        const estimate = await collection.estimatedDocumentCount();
        console.log(`DB > Loaded ${estimate} items...`);
      } catch (e) {
        console.log(`DB > Failed to connect`, e);
      };
    };
    intFunction().then(() => {
      return Client;
    });
  });
};

module.exports = {
  connect,
  Client
};
