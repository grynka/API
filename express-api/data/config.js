const mysql = require("mysql2");

// Set database connection credentials
const config = {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "td1q2018",
};

// Create a MySQL pool
const pool = mysql.createPool(config);


// Export the pool
module.exports = pool;