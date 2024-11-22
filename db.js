const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'service_manager'
});

db.connect((err) => {
  if (err) {
    console.error('Connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;