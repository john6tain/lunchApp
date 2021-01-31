const controllers = require('../controllers/index');
const permissions = require('./permissions');
const authenticate = require('../utilities/authentication');
var multer = require("multer");

module.exports = (app) => {
    // app.post('/user/register', controllers.user.register.post);
    app.post('/lunch/request', controllers.user.sendLunchRequest);
    app.post('/user/login', controllers.user.login.post);
    app.post('/user/menu/update', authenticate, controllers.user.menu.update);
    app.get('/user/menu/get', controllers.user.menu.get);
    app.post('/user/menu/upload',authenticate, controllers.user.menu.file.upload);
    app.get('/user/menu/upload/get',authenticate, controllers.user.menu.file.get);
    app.post('/user/logout', authenticate, controllers.user.logout);
    app.delete('/user/delete/lunch/request/:id', authenticate, controllers.user.requests.delete);
    app.get('/lunch/admin/requests', authenticate, controllers.user.requests.get);
    // app.get('/get/admin', authenticate, controllers.combatant.showdown.get);
***REMOVED***