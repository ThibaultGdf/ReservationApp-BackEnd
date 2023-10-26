var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/reservations', function(req, res, next) {
  res.json({message: 'Vous êtes sur la route de reservations !'});
});

module.exports = router;
