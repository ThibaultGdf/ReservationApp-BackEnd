var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send({message: 'Vous êtes sur la route de users !'});
});

module.exports = router;
