const path = require('path');

module.exports = {
    development: {
        // connectionString: `mongodb://localhost:27017/${dbName}`
        connectionString:"mongodb+srv://FaQVhPC01mbBLmgK:FaQVhPC01mbBLmgK@cluster0.fd9su.mongodb.net/lunchApp?retryWrites=true&w=majority"
    },
    production: {
        connectionString:"mongodb://Admin:admin@ds153682.mlab.com:53682/lunchapp"
    }
};