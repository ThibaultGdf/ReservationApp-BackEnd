var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/spots', function(req, res, next) {
  res.json({message: 'Vous êtes sur la route de spots !'});
});

module.exports = router;
