const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  total_due: {type: Number, default: 0},
  total_deposit: {type: Number, default: 0},
  balance: {type: Number, default: 0},
  is_deleted: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Accounts', customerSchema)