const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

function getRequiredPropMsg(prop) {
    return `${prop} is required!`;
}

let userSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: getRequiredPropMsg('Username'),
        unique: true
***REMOVED***
    password: {
        type: mongoose.Schema.Types.String,
        required: getRequiredPropMsg('Password')
***REMOVED***
    salt: {
        type: mongoose.Schema.Types.String,
        required: true
***REMOVED***
    roles: [{ type: mongoose.Schema.Types.String  }]
});

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);

        return hashedPassword === this.password;
***REMOVED***
    hasAccess: function (role) {
        return this.roles.indexOf(role) !== -1;
***REMOVED***
});

const User = mongoose.model('User', userSchema);

module.exports = User;
