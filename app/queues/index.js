(function() {
   var app = require('express')()
      , queues = require('./queues');

   app.locals.pretty = true;

   app.get('/queues', queues.get);

   module.exports = app;
})();
