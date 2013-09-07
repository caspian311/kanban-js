(function() {
   var exec = require('child_process').exec
   var run = function(command) {
      exec(command, function(err, output) {
         console.log(output);
         if (err) {
            throw err;
         }
      })
   }

   desc('Run all tests');
   task('default', ['test']);

   desc('Run all unit tests');
   task('test', function() {
      run('NODE_ENV=test ./node_modules/.bin/mocha --reporter spec --require test/test_helper.js --colors --recursive');
   });

   desc('Run all cucumber tests');
   task('cukes', function() {
      run('./node_modules/.bin/cucumber.js');
   });
})()
