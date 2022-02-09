const {
  MongoClient
} = require('mongodb');
const s3 = require("./s3");
const config = require('./config');

var client;

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

var connectNow = async function () {
  let user = config.MONGO_USER
  let db = config.MONGO_DB
  let pass = await s3.getMongoPassword();
  var uri = "mongodb+srv://" + user + ":" + pass + "@meriwaliwish.z9nbu.mongodb.net/" + db + "?authSource=admin&retryWrites=true&w=majority";

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("DB > Connnecting to the database...");
  try {
    await client.connect();
    const collection = client.db("meriwaliwish").collection("item");
    console.log("DB > Connection to the database established successfully... :)");
    const estimate = await collection.estimatedDocumentCount();
    console.log(`DB > Loaded ${estimate} items...`);
  } catch (e) {
    console.log(`DB > Failed to connect`, e);
  };
};

module.exports = {
  connectNow
};
