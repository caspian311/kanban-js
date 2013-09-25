app = require('express')()
login = require './login'
setupViews = require('../../module_helper').setupViews

app.locals.pretty = true
setupViews app, __dirname

app.get '/login', login.index
app.post '/login', login.submit

module.exports = app

