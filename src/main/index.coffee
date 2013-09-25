app = require('express')()
main = require './main'
setupViews = require('../../module_helper').setupViews

app.locals.pretty = true

setupViews app, __dirname
app.get '/', main.main

module.exports = app
