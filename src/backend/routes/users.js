module.exports = app => {
  var router = require("express").Router();
  const users = require("../controllers/user.controller");
  
  router.get("/", users.findAll);
  router.get("/:id", users.findOne )
  app.use('/users', router);

};
