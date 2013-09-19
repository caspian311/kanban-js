// Generated by CoffeeScript 1.6.3
(function() {
  var authenticate;

  authenticate = function(request, response, next) {
    if (request.user || request.path === '/login' || request.path === '/registration') {
      return next();
    } else {
      return response.redirect('/login');
    }
  };

  module.exports = authenticate;

}).call(this);
