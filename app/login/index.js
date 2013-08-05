(function() {
   var app = require('express')()
      , login = require('./login');

   app.locals.pretty = true;
   app.set('views', __dirname);

   app.get('/login', login.form);
   app.post('/login', login.submit);

   module.exports = app;
})();
