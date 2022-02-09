const aws = require('aws-sdk');
const config = require('./config');
const { param } = require('./routes');

aws.config.update({
  region: config.S3_REGION
});

aws.config.credentials = new aws.SharedIniFileCredentials({
  profile: 'mww-profile'
});;

// Create S3 service object
var s3 = new aws.S3({
  apiVersion: config.S3_VERSION
});

var getMongoPassword = async function() {
  var params = {
    Bucket: config.S3_BUCKET,
    Key: config.MONGO_PASSWD
  };

  return (await (s3.getObject(params).promise())).Body.toString('utf-8');
};



module.exports = {
  getMongoPassword
}
