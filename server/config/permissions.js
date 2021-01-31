const authenticate = require('../utilities/authentication');


***REMOVED***
    hasUserAccess: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
    ***REMOVED*** else {
            return res.status(403).send({ message: 'Wrong credentials' });
    ***REMOVED***
***REMOVED***
    hasAccess: (role) => {
        return (req, res, next) => {
            if (req.user && req.user.roles.indexOf(role) !== -1) {
                next();
        ***REMOVED*** else {
                return res.status(403).send();
        ***REMOVED***
    ***REMOVED***
***REMOVED***
***REMOVED***