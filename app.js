var express = require('express')
  , http = require('http')
  , path = require('path')
  , main = require('./app/main')
  , queues = require('./app/queues')
  , cards = require('./app/cards')
  , login = require('./app/login')
  , logout = require('./app/logout')
  , registration = require('./app/registration')
  , authentication = require('./app/authentication');

var app = express()

app.use(express.logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'jade')

app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.favicon())
app.use(express.cookieParser())
app.use(express.session({ secret: 'keyboard cat' }))

app.use(authentication)

app.use(main)
app.use(queues)
app.use(cards)
app.use(login)
app.use(logout)
app.use(registration)

http.createServer(app).listen(3000, function(){
  console.log("Express server listening on port 3000")
});
