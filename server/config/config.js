module.exports = {
    development: {
        // connectionString: `mongodb://localhost:27017/${dbName}`
        connectionString: `mongodb+srv://${process.env.API_KEY}@cluster0.fd9su.mongodb.net/lunchApp?retryWrites=true&w=majority`
    },
    production: {
        connectionString: `mongodb+srv://${process.env.API_KEY}@cluster0.fd9su.mongodb.net/lunchApp?retryWrites=true&w=majority`
    }
};