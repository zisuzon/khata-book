var express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Accounts = require('../models/accounts')


router.get('/create', function(req, res, next) {
  Accounts.find(function(err, content) {
    res.render('accounts/create', { title: 'নতুন কাস্টমার', contents: content })
  })
})

router.post('/addAccount', function(req, res, next) {
  console.log('session', req.session)

  // req.checkBody('account_name', 'Name is required').notEmpty()

  const account = new Accounts({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.account_name
  })

  account
  .save()
  .then((result) => {
    res.redirect('/')
  })
  .catch((err) => {
    console.log('err', err)
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router
