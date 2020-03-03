const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const fetch = require('node-fetch')

const Accounts = require('../models/accounts')
const Agents = require('../models/agents')

const storebackAgentUrl = 'https://api.staging.deligram.com/storefront/api/v1/agent'

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnaW5nLmRlbGlncmFtLmNvbS9zdG9yZWZyb250L2FwaS92MS9hZ2VudC9sb2dpbiIsImlhdCI6MTU4MzA0MzI3NiwibmJmIjoxNTgzMDQzMjc2LCJqdGkiOiI4SWo1S3BnRWh5MTRiWmZ1Iiwic3ViIjoxODQ1LCJwcnYiOiI0MmVkZTMzMzRhMDRjZDY1Y2IyYmUzZjVhZGZlYjJjMWVkZDMwNzc0IiwidHlwZSI6IkFwcFxcTW9kZWxzXFxBZ2VudCJ9.H5hMQawTc4lk20IajpJc0ZZWietsX0im4Qw3it-dkLE

router.get('/start/:agentToken', function(req, res, next) {
  let agentToken = req.params.agentToken
  const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Authorization': `bearer ${agentToken}`
    }
  }

  fetch(storebackAgentUrl, options)
  .then(response => response.json())
  .then(data => {
    let query = Agents.find({agent_id: data.id})

    query.exec(function(err, docs) {
      if (docs.length) {
        req.session.agentInfo = {
          agent_id: docs[0].agent_id,
          name: docs[0].name,
          shop_name: docs[0].shop_name,
          createdAt: docs[0].createdAt,
          updatedAt: docs[0].updatedAt,
        }
        // res.render('index', { title: 'dgখাতা', subtitle: 'বাকী-জমার হিসাব নিকাশ ম্যানেজ করতে ব্যবহার করুন'})
        res.redirect('/')
      } else {
        res.render('start', { title: 'dgখাতা', subtitle: 'বাকী-জমার হিসাব নিকাশ ম্যানেজ করতে ব্যবহার করুন', agentToken })
      }
    })
  })
  .catch(err => console.log('err', err))
})

// AGENT REGISTRATION
router.get('/registerAgent/:agentToken', function(req, res, next) {
  let agentToken = req.params.agentToken
  const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'Authorization': `bearer ${agentToken}`
    }
  }

  fetch(storebackAgentUrl, options)
  .then(response => response.json())
  .then(data => {
    const agent = new Agents({
      _id: new mongoose.Types.ObjectId(),
      agent_id: data.id,
      name: data.address.contact_name,
      shop_name: data.name.en
    })
  
    agent
    .save()
    .then((result) => {
      req.session.agentInfo = {
        agent_id: docs[0].agent_id,
        name: docs[0].name,
        shop_name: docs[0].shop_name,
        createdAt: docs[0].createdAt,
        updatedAt: docs[0].updatedAt,
      }
      res.redirect('/')
    })
    .catch((err) => {
      console.log('err', err)
      res.status(500).json({
        error: err
      })
    })
  })
  .catch(err => console.log('err', err))

})

// HOME PAGE
router.get('/', function(req, res, next) {
  if (req.session.agentInfo) {
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
      res.render('index', { title: 'Details', allCustomers: allCustomers })
    })
  } else {
    res.render('index', { message: 'Login needed', error: { status: 404 } })
  }
})


module.exports = router
