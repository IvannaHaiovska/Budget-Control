module.exports = app => {
  const router = require("express").Router();
  const users = require("../controllers/user.controller");

  router.get("/", users.findAll);
  router.get("/savings", users.findAllSav);
  router.post("/savings", users.createSav);
  router.get("/spends", users.findAllSp);
  router.post("/spends", users.createSp);
  router.get("/history", users.findHistory);
  router.get("/:id", users.findOne);
  router.get("/history/:year", users.findHistoryByYear);
  router.put("/:id", users.updateUser);
  router.put("/income/:id", users.updateIncome);
  router.put("/balance/:id", users.updateBalance);
  router.put("/expenses/:id", users.updateExpenses);
  router.put("/savings/:id", users.updateSav);
  router.put("/spends/:id", users.updateSp);
  router.post("/history/:month", users.createHistory);
  
  app.use('/users', router);

};
