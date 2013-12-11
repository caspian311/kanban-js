app = require('express')()
cards = require './cards'

app.locals.pretty = true;

app.get '/cards/:id', cards.get
app.post '/cards', cards.post

module.exports = app;

