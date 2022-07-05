const dbConn = require('../config/db.config');

  exports.findAll = (req, res) =>{
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