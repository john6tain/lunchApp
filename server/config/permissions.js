const authenticate = require('../utilities/authentication');


module.exports = {
    hasUserAccess: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            return res.status(403).send({ message: 'Wrong credentials' });
        }
    },
    hasAccess: (role) => {
        return (req, res, next) => {
            if (req.user && req.user.roles.indexOf(role) !== -1) {
                next();
            } else {
                return res.status(403).send();
            }
        }
    },
};