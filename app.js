const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// const expressValidator = require('express-validator')
const expressSession = require('express-session')

const indexRouter = require('./routes/index')
const accountCreateRouter = require('./routes/accounts')


// Database connection
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(
`mongodb+srv://zisuzon:hello@cluster0-yejsy.mongodb.net/test?retryWrites=true&w=majority`
)

// `mongodb+srv://zisuzon:${process.env.MONGO_ATLAS_PW}@cluster0-yejsy.mongodb.net/test?retryWrites=true&w=majority`

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(expressValidator())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressSession({secret: 'dgKhata', saveUninitialized: false, resave: false}))

app.use('/', indexRouter)
app.use('/accounts', accountCreateRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
