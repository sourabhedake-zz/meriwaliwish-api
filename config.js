const config = {
  dev: {
    PORT: 3000,
    UI: "https://meriwaliwish.com"
  },
  common: {
    // Mongo DB 
    MONGO_USER: "cortex",
    MONGO_DB: "meriwaliwish",
    MONGO_PASSWD: "MONGO_PASSWD",

    // S3
    S3_REGION: "ap-south-1",
    S3_VERSION: "2012-10-17",
    S3_BUCKET: "mww-data"
  },
  production: process.env
}

config_env = config[process.env.NODE_ENV] == undefined ?
  config.dev :
  config[process.env.NODE_ENV]

module.exports = {
  ...config_env,
  ...config.common
}
