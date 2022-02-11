var util = require('./util')
var {
  Client
} = require("../mongo/mongo-connect");

function getItems(req, res) {
  var {
    limit,
    skip
  } = util.getPageAttributes(req);
  try {
    var items;
    var getItem = async function () {
      items = await Client.database.collection("item").find().limit(limit).skip(skip).toArray();
      return items;
    }
    getItem().then((data) => {
      console.log(data);
      res.status(200).json(items);
    }).catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err
      });
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err
    });
  }
}

module.exports = {
  getItems
}
