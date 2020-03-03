const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const fetch = require('node-fetch')

const Accounts = require('../models/accounts')
const Agents = require('../models/agents')

const storebackAgentUrl = 'https://api.staging.deligram.com/storefront/api/v1/agent'

// HOME PAGE
router.get('/', function(req, res, next) {
  console.log('hoy ni re?')
  Accounts.find()
  .exec()
  .then(docs => {
    let allCustomers = [...docs].map((dc) => {
      dc.updatedAt = dc.updatedAt.toDateString()
      // let deposit, due
      if (dc.balance >= 0) {
        dc.deposit = Math.abs(dc.balance)
      } else {
        dc.due = Math.abs(dc.balance)
      }
      return dc
    })

    console.log('hoy ni re?', allCustomers)
    res.render('index', { title: 'Details', allCustomers: allCustomers })
  })
})


module.exports = router
