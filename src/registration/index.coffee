app = require('express')()
registration = require './registration'

app.locals.pretty = true
app.set 'views', __dirname

app.get '/registration', registration.form
app.post '/registration', registration.create

module.exports = app
