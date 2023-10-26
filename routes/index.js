var express = require('express');
var router = express.Router();

const reservationsRouter = require("./reservations.js");
const usersRouter = require("./users.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Response: Index'});
});

router.use(reservationsRouter);
router.use(usersRouter);

module.exports = router;