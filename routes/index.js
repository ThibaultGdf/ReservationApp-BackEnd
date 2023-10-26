var express = require('express');
var router = express.Router();

const reservationsRouter = require("./reservations.js");
const usersRouter = require("./users.js");
const roomsRouter = require("./rooms.js");
const spotsRouter = require("./spots.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Response: Index'});
});

router.use(reservationsRouter);
router.use(usersRouter);
router.use(roomsRouter);
router.use(spotsRouter);

module.exports = router;