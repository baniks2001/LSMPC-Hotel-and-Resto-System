const mysql = require('mysql2');

// Create the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'hotel_reservation', // replace with your actual database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
    return;
  }
  console.log('Connected to the database');
});


module.exports = db;
