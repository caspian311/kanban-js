(function () {
   var crypto = require('crypto');

   var EncryptionUtils = function() {
      this.encrypt = function(plainText) {
         var cipher = crypto.createCipher('aes-128-cbc', 'mary had a little lamb');

         return cipher.update(plainText,'utf8','hex') + cipher.final('hex');
      };
   };

   module.exports = new EncryptionUtils();
})();
