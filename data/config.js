const mysql = require('mysql2/promise');

const {PORT_AZUR} = process.env;
const {SERVER} = process.env;
const {USER} = process.env;
const {PASSWORD} = process.env;
const {DATABASE} = process.env;

const TecDoc = mysql.createPool({
  host: `${SERVER}:${PORT_AZUR}`,
  user: USER,
  password:PASSWORD,
  database: DATABASE,
});

// Create a MySQL pool
const Auto = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'td1q2018',
});

// Export the pool
module.exports = {Auto, TecDoc};