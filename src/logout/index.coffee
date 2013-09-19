app = require('express')()
logout = require './logout'

app.get '/logout', logout.logout

module.exports = app
