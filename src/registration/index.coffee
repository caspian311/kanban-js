app = require('express')()
registration = require './registration'
setupViews = require('../../module_helper').setupViews

app.locals.pretty = true
setupViews app, __dirname

app.get '/registration', registration.index
app.post '/registration', registration.create

module.exports = app
