var fs = require('fs');

var walk = function(dir, done) {
   var results = [];
   fs.readdir(dir, function(err, list) {
      if (err) {
         return done(err);
      }

      var pending = list.length;
      if (!pending) {
         return done(null, results);
      }

      list.forEach(function(file) {
         file = dir + '/' + file;
         fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
               walk(file, function(err, res) {
                  results = results.concat(res);
                  if (!--pending) {
                     done(null, results);
                  }
               });
            } else {
               if (file.indexOf('.swp') == -1) {
                  results.push(file);
               }
               if (!--pending) {
                  done(null, results);
               }
            }
         });
      });
   });
};

module.exports = walk;
