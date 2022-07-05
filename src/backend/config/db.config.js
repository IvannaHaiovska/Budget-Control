var mysql = require('mysql');
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  db: "budgetControl",
  dialect: "mysql",
});

// connect to database
dbConn.connect();

module.exports = dbConn;