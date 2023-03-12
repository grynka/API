const app = require('./app')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const {PORT} = process.env;
const {HOST} = process.env;

const connection = mongoose.connect(HOST)

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful ${PORT}`)
    })
  })
  .catch((err) =>{
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1)}
  )
