(function() {
   var chai = require('chai');

   chai.should();
   chai.Assertion.includeStack = true;

   global.sinon = require('sinon');
   global.assert = chai.assert;
   global.expect = chai.expect;
})();
