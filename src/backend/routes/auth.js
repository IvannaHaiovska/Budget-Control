const auth = require("../controllers/auth.controller");

const router = require("express").Router();

router.post('/signup', auth.signin);

module.exports = router;
