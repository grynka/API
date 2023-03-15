const mysql2 = require('mysql2/promise');


// Create a MySQL pool
const Auto = mysql2.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'td1q2018',
});

// Export the pool
module.exports = {Auto};