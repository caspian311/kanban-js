crypto = require 'crypto'

class EncryptionUtils
   encrypt: (plainText) ->
      cipher = crypto.createCipher 'aes-128-cbc', 'mary had a little lamb'

      cipherText = cipher.update plainText, 'utf8', 'hex'
      cipherText += cipher.final 'hex'

module.exports = new EncryptionUtils
