(function() {
  var express = require('express')
     , http = require('http')
     , path = require('path')
     , main = require('./app/main')
     , login = require('./app/login')
     , registration = require('./app/registration')
     , authentication = require('./app/authentication');

   var app = express()

   app.use(express.static(path.join(__dirname, 'public')))
   app.set('view engine', 'jade')

   app.use(express.logger('dev'))
   app.use(express.bodyParser())
   app.use(express.methodOverride())
   app.use(express.favicon())
   app.use(express.cookieParser())
   app.use(express.session({ secret: 'keyboard cat' }))

   app.use(authentication)

   app.use(main)
   app.use(login)
   app.use(registration)

   http.createServer(app).listen(3000, function(){
     console.log("Express server listening on port 3000")
   });
})();
