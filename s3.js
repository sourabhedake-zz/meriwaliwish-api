var AWS = require('aws-sdk');
const config = require('./config');

var getMongoPassword = async function () {
  return process.env.MONGO_PASSWD;

  AWS.config.update({
    region: config.S3_REGION
  });

  AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: 'mww-profile'
  });;

  // Create S3 service object
  const s3 = new AWS.S3();

  var params = {
    Bucket: config.S3_BUCKET,
    Key: config.MONGO_PASSWD
  };

  console.log("DB > Looking for DB authentication");
  var pass = "";
  try {
    var getItem = async function () {
      try {
        // var data = await test();
        let data2 = await s3.getObject(params).promise();
        pass = data2.Body.toString('utf-8');
      } catch (err) {
        console.log("DB > Error: ", err);
      }
    }
    await getItem();
  } catch (err) {
    console.log("DB > Error: ", err);
  }

  return pass;
};

module.exports = {
  getMongoPassword
}
