var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/rooms', function(req, res, next) {
  res.json({message: 'Vous êtes sur la route de rooms !'});
});

module.exports = router;
