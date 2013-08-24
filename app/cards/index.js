(function() {
   var app = require('express')();

   app.locals.pretty = true;

   app.post('/cards', function() {});

   module.exports = app;
})();
