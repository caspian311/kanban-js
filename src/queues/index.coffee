app = require('express')()
queues = require './queues'

app.locals.pretty = true

app.get '/queues', queues.get
app.post '/queues', queues.post
app.put '/queues', queues.put
app.del '/queues/:id', queues.del

module.exports = app
