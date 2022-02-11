var express = require('express');
var items = require('../modules/items');

var router = express.Router();

/* GET Items */
router.get('/', function (req, res, next) {
  try {
    items.getItems(req, res);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
});

module.exports = router;
