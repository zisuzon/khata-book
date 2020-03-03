const mongoose = require('mongoose')

const agentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  agent_id: String,
  name: String,
  shop_name: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Agents', agentSchema)