(function() {
   var app = require('express')()
      , cards = require('./cards');

   app.locals.pretty = true;

   app.post('/cards', cards.post);

   module.exports = app;
})();
