(function() {
   var app = require('express')()
      , registration = require('./registration');

   app.locals.pretty = true;
   app.set('views', __dirname);

   app.get('/registration', registration.form);

   module.exports = app;
})();
