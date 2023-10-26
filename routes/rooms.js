var express = require('express');
var router = express.Router();
const { Room } = require('../db.js');

/* GET home page. */
router.get('/rooms', function(req, res, next) {
  res.json({message: 'Vous êtes sur la route de rooms !'});
});

module.exports = router;
