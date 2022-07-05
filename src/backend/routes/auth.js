const auth = require("../controllers/auth.controller");

var router = require("express").Router();

router.post('/signup', auth.signin);

module.exports = router;
