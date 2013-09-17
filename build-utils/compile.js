var walk = require('./walk');

var compile = function(srcDir, destDir, callback) {
   walk(srcDir, function(_, files) {
      files.forEach(function (srcFile) {
         var destFile = destDir + (srcFile.substr(srcDir.length, srcFile.length));
         callback(srcFile, destFile);
      });
   });
};

module.exports = compile;
