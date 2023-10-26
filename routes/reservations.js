var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/reservations', function(req, res, next) {
  res.json({ title: 'Response: Reservations'});
});

module.exports = router;
