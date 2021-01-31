const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportStrategy = require('./passport');
const cors = require('cors');

module.exports = (app, config) => {
    "use strict";
    // app.set('view engine', 'pug');
    // app.use( express.static(__dirname));
    app.use('/', express.static(path.join(__dirname, '/../../build')));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(bodyParser.json());

    // Module to Allow Access Control Origin
    app.use(cors());

    passport.use('passport', passportStrategy);

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
    ***REMOVED***

        next();
***REMOVED***);

    // Configure middleware for parsing forms
    //app.use(bodyParser.urlencoded({ extended: true }));
***REMOVED***