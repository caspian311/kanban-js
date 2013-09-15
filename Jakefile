(function() {
   var exec = require('child_process').exec
      , fs = require('fs')

   var run = function(command) {
      exec(command, function(err, output) {
         console.log(output);
         if (err) {
            throw err;
         }
      })
   };

   desc('Run all tests');
   task('default', ['test']);

   desc('Run all unit tests');
   task('test', function() {
      run('NODE_ENV=test ./node_modules/.bin/mocha --reporter spec --require test/test_helper.js --colors --recursive');
   });

   desc('Run all cucumber tests');
   task('cukes', function() {
      run('NODE_ENV=cukes ./node_modules/.bin/cucumber.js --format pretty');
   });

   desc('Run the cucumber tests marked as WIP');
   task('cukes-wip', function() {
      run('NODE_ENV=cukes ./node_modules/.bin/cucumber.js --format pretty --tags=@wip');
   });

   desc('Compile all LESS files');
   task('less', function() {
      var files = fs.readdirSync('./less-src');
      for (var i in files) {
         var lessFile = files[i];
         var cssFile = lessFile.substr(0, lessFile.indexOf('.less')) + '.css';

         var lessFileFullPath = './less-src/' + lessFile;
         var cssFileFullPath = './public/css/' + cssFile;

         run('./node_modules/.bin/lessc ' + lessFileFullPath + ' > ' + cssFileFullPath);
      }
   });
})()
