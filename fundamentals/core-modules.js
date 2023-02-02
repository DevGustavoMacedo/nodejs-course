const crypto = require('crypto')

const algorithm = crypto.createHmac('sha256', 'password')
                  .update("Do you have ligma?").digest('hex')

console.log(algorithm)