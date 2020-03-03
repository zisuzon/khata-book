const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  account_id: String,
  due: Number,
  deposit: Number,
  date: Date
})

module.exports = mongoose.model('Transactions', transactionSchema)