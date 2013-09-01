(function () {
   var crypto = require('crypto');

   var EncryptionUtils = function() {
      this.encrypt = function(plainText) {
         var cipher = crypto.createCipher('aes-128-cbc','mary had a little lamb');
         var crypted = cipher.update(plainText,'utf8','hex');
         crypted += cipher.final('hex');
         return crypted;
      };
   };

   module.exports = new EncryptionUtils();
})();
