const crypto = require('crypto');

***REMOVED***
    generateSalt: () => {
        return crypto.randomBytes(128).toString('base64');
***REMOVED***
    generateHashedPassword: (salt, pwd) => {
        return crypto
            .createHmac('sha256', salt)
            .update(pwd)
            .digest('hex');
***REMOVED***
}