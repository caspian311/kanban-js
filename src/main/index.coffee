app = require('express')()
main = require './main'

app.locals.pretty = true

app.set 'views', __dirname
app.get '/', main.main

module.exports = app
