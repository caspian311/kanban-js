(function() {
   var app = require('express')()
      , queues = require('./queues');

   app.locals.pretty = true;

   app.get('/queues', queues.get);
   app.post('/queues', queues.post);
   app.put('/queues', queues.put);

   module.exports = app;
})();
