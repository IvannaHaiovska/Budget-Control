module.exports = app => {
  const router = require("express").Router();
  const users = require("../controllers/user.controller");

  router.get("/", users.findAll);
  router.get("/savings", users.findAllSav);
  router.get("/spends", users.findAllSp);
  router.get("/:id", users.findOne);
  router.put("/:id", users.updateUser);
  router.put("/income/:id", users.updateIncome);
  router.put("/balance/:id", users.updateBalance);
  router.put("/expenses/:id", users.updateExpenses);
  router.put("/savings/:id", users.updateSav);
  router.put("/spends/:id", users.updateSp);
  app.use('/users', router);

};
