const dbConn = require('../config/db.config');

exports.findAll = (req, res) => {
  dbConn.query('SELECT * FROM budgetControl.users', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
};

exports.findOne = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  dbConn.query(`SELECT * FROM budgetControl.users WHERE id='${req.params.id}'`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(results);
    });
};
exports.updateUser = (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let usersurname = req.body.usersurname;
  let email = req.body.email;
  let password = req.body.password;
  let balance = req.body.balance;

  if (!id || !username || !usersurname || !email || !password || !balance) {
    return res.status(400).send({
      error: username,
      message: 'Please provide username and id'
    });
  }

  dbConn.query("UPDATE budgetControl.users SET username = ?, usersurname = ?, email= ?, password=?, balance = ?  WHERE id = ?", [username, usersurname, email, password, balance, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'user has been updated successfully.'
    });
  });
};

exports.updateIncome = (req, res) => {
  let id = req.body.id;
  let income = req.body.income;

  if (!id || !income) {
    return res.status(400).send({
      error: income,
      message: 'Please provide income and id'
    });
  }

  dbConn.query("UPDATE budgetControl.users SET income = ? WHERE id = ?", [income, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'income has been updated successfully.'
    });
  });
};

exports.updateBalance = (req, res) => {
  let id = req.body.id;
  let balance = req.body.balance;

  if (!id || !balance) {
    return res.status(400).send({
      error: balance,
      message: 'Please provide balance and id'
    });
  }

  dbConn.query("UPDATE budgetControl.users SET balance = ? WHERE id = ?", [balance, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'balance has been updated successfully.'
    });
  });
};

exports.updateExpenses = (req, res) => {
  let id = req.body.id;
  let expenses = req.body.expenses;

  if (!id || !expenses) {
    return res.status(400).send({
      error: expenses,
      message: 'Please provide expenses and id'
    });
  }

  dbConn.query("UPDATE budgetControl.users SET expenses = ? WHERE id = ?", [expenses, id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'expenses has been updated successfully.'
    });
  });
};

exports.findAllSav = (req, res) => {
  dbConn.query('SELECT * FROM budgetControl.savings', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
};

// exports.findAllStatisticSav = (req, res) => {
//   dbConn.query('SELECT * FROM budgetControl.savings', function (error, results) {
//     if (error) throw error;
//     console.log(req.params.sum);
//     // return res.send(results);
//   });
// };


exports.createSav = (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let sum = req.body.sum;
  let users_id = req.body.users_id;
  let create_at = req.body.create_at;

  dbConn.query("INSERT INTO budgetControl.savings SET name = ?, sum = ?, users_id = ?", [name, sum, users_id, id, create_at], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Savings has been create successfully.'
    });
  });
};

exports.updateSav = (req, res) => {
  let user_id = req.body.id;
  let sum = req.body.sum;

  if (!user_id || !sum) {
    return res.status(400).send({
      error: sum,
      message: 'Please provide sum and user_id'
    });
  }

  dbConn.query("UPDATE budgetControl.savings SET sum = ? WHERE id = ?", [sum, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Savings has been updated successfully.'
    });
  });
};


exports.findAllSp = (req, res) => {
  dbConn.query('SELECT * FROM budgetControl.spends', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
};

exports.findHistory = (req, res) => {
  dbConn.query('SELECT * FROM budgetControl.history', function (error, results) {
    if (error) throw error;
    return res.send(results);
  });
};

exports.findHistoryByYear = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  dbConn.query(`SELECT * FROM budgetControl.history WHERE year = '${req.params.year}'`,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(results);
    });
};

exports.createSp = (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let sum = req.body.sum;
  let users_id = req.body.users_id;
  let create_at = req.body.create_at;

  dbConn.query("INSERT INTO budgetControl.spends SET name = ?, sum = ?, users_id = ?", [name, sum, users_id, id, create_at], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Іpends has been create successfully.'
    });
  });
};

exports.updateSp = (req, res) => {
  let user_id = req.body.id;
  let sum = req.body.sum;

  if (!user_id || !sum) {
    return res.status(400).send({
      error: sum,
      message: 'Please provide sum and user_id'
    });
  }

  dbConn.query("UPDATE budgetControl.spends SET sum = ? WHERE id = ?", [sum, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'Spends has been updated successfully.'
    });
  });
};


exports.createHistory = (req, res) => {
  let id = req.body.id;
  let category = req.body.category;
  let sum = req.body.sum;
  let users_id = req.body.users_id;
  let create_at = req.body.create_at;

  dbConn.query("INSERT INTO budgetControl.history SET category = ?, sum = ?, users_id = ?  ", 
    [category, sum, users_id, id, create_at], function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'New history has been created successfully.'
    });
  });
};
