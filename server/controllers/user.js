const User = require('../models/User');
const Menu = require('../models/Menu');
const OrderMenu = require('../models/OrederMenu');
const encryption = require('../utilities/encryption');
const passport = require('passport');
const fs = require("fs");
const formidable = require('formidable');
const path = require('path');

***REMOVED***
    register: {
        post: (req, res) => {
            let userData = req.body;
            if (!userData.username) {
                return res.status(403).send({ message: 'Cannot register user with blank username!' });
        ***REMOVED***
            if (userData.password && userData.password !== userData.confirmedPassword) {
                return res.status(403).send({ message: 'Passwords do not match' });
        ***REMOVED***

            let salt = encryption.generateSalt();
            userData.salt = salt;

            if (userData.password) {
                userData.password = encryption.generateHashedPassword(salt, userData.password);
        ***REMOVED***
            User.find({ username: userData.username }).then(existingUser => {
                if (existingUser.length === 0) {
                    User.create(userData)
                        .then(user => {
                            //TODO: check if user exist
                            res.status(200).send({ success: true, message: 'You successfully registered user now Please login' });
                    ***REMOVED***)
                        .catch(error => {
                            userData.error = error;
                            res.status(404).send({ error: error });
                    ***REMOVED***);

                    return;
            ***REMOVED***

                res.status(403).send({ message: 'That username is already registered. Please pick another. ' });
        ***REMOVED***);

    ***REMOVED***
***REMOVED***
    login: {
        post: (req, res, next) => {
            let userData = req.body;
            User.findOne({ username: userData.username }).then(user => {
                if (!user || !user.authenticate(userData.password)) {
                    return res.status(403).send({ message: 'Wrong credentials' });
            ***REMOVED***

                return passport.authenticate('passport', (err, token, userData) => {
                    if (err) {
                        if (err.name === 'IncorrectCredentialsError') {
                            return res.status(200).json({
                                success: false,
                                message: err.message
                        ***REMOVED***);
                    ***REMOVED***

                        return res.status(200).json({
                            success: false,
                            message: 'Could not process the form.'
                    ***REMOVED***);
                ***REMOVED***

                    return res.json({
                        success: true,
                        message: 'You have successfully logged in!',
                        token,
                        user: userData
                ***REMOVED***);
            ***REMOVED***)(req, res, next);
        ***REMOVED***);
    ***REMOVED***
***REMOVED***

    sendLunchRequest: (req, res) => {
        let userData = req.body;

        if (!userData.user) {
            return res.status(403).send({ message: 'Cannot send lunch request without your name' });
    ***REMOVED***
        if (!userData.menu) {
            return res.status(403).send({ message: 'You first need to select from the menu' });
    ***REMOVED***
        Menu.find({ user: userData.user }).then(existingUser => {
            if (existingUser.length === 0) {
                Menu.create(userData)
                    .then(user => {
                        //TODO: check if user exist
                        return res.json({
                            success: true,
                            message: 'You have successfully request your lunch!',
                    ***REMOVED***);
                ***REMOVED***)
                    .catch(error => {
                        userData.error = error;
                        res.status(404).send({ error: error });
                ***REMOVED***);

                return;
        ***REMOVED***

            res.status(403).send({ message: 'That username is already in use. Please pick another.' });
    ***REMOVED***);

***REMOVED***

    logout: (req, res) => {
        req.logout();
        res.status(200).end();
***REMOVED***

    requests: {
        delete: (req, res) => {
            if (!req.params || !req.params.id) {
                return res.status(401).send({ message: 'You have to enter Menu ID' });
        ***REMOVED***

            Menu.deleteOne({ _id: req.params.id }).then(items => {
                Menu
                    .find()
                    .then(menu => {
                        if (menu.length === 0) {
                            return res.status(200).send({
                                menu: [],
                                message: "There are no requests to display. Please add some!"
                        ***REMOVED***);

                    ***REMOVED***
                        return res.json({
                            success: true,
                            menu: { menu },
                            message: 'You have successfully delete a lunch request !',
                    ***REMOVED***);
                ***REMOVED***);

        ***REMOVED***)
                .catch(error => {
                    res.status(404).send({ message: 'No records Found' });
            ***REMOVED***);
    ***REMOVED***

        get: (req, res) => {
            Menu
                .find()
                .then(menu => {
                    if (menu.length === 0) {
                        return res.status(200).send({
                            menu: [],
                            message: "There are no requests to display. Please add some!"
                    ***REMOVED***);

                ***REMOVED***
                    res.status(200).send({ menu });
            ***REMOVED***);
            // res.status(200).end();
    ***REMOVED***
***REMOVED***
    menu: {
        update: (req, res) => {
            let menuData = req.body.name && req.body || JSON.parse(Object.keys(req.body).pop());
            OrderMenu.find({ name: menuData.name }).then(existingOrderMenu => {
                if (existingOrderMenu.length === 0) {
                    OrderMenu.create({ name: menuData.name, orderMenu: menuData.orderMenu })
                        .then(orderMenu => {
                            res.status(200).send({ success: true, message: 'You successfully created the Order Menu' });
                    ***REMOVED***)
                        .catch(error => {
                            res.status(404).send({ error: error });
                    ***REMOVED***);

                    return;
            ***REMOVED*** else {
                    OrderMenu.findOneAndUpdate({ name: menuData.name }, { name: menuData.name, orderMenu: menuData.orderMenu })
                        .then(orderMenu => {
                            res.status(200).send({ success: true, message: 'You successfully updated your Order Menu' });
                    ***REMOVED***)
                        .catch(error => {
                            res.status(404).send({ error: error });
                    ***REMOVED***);
                    return
            ***REMOVED***

                // res.status(403).send({ message: 'This should not have happend' });
        ***REMOVED***);
    ***REMOVED***
        get: (req, res) => {
            OrderMenu
                .find()
                .then(orederMenu => {
                    if (orederMenu.length === 0) {
                        return res.status(200).send({
                            orederMenu: [],
                            message: "You don\t have order menu in the DB"
                    ***REMOVED***);

                ***REMOVED***

                    res.status(200).send(orederMenu[0]);
            ***REMOVED***);
    ***REMOVED***
        file: {
            upload: (req, res) => {
                OrderMenu.create({ name: 'PNG', orderMenu: req.body.base64 })
                    .then(orderMenu => {
                      res.redirect('/user/menu/upload/get');
                ***REMOVED***)
                    .catch(error => {
                        res.status(404).send({ error: error });
                ***REMOVED***);
        ***REMOVED***
            get: (req, res) => {
                OrderMenu
                    .find()
                    .then(orederMenu => {
                        if (orederMenu.length === 0) {
                            return res.status(200).send({
                                orederMenu: [],
                                message: "You don\t have order menu in the DB"
                        ***REMOVED***);

                    ***REMOVED***
                        if (orederMenu[1] && orederMenu[1].orderMenu) {
                            fs.writeFile('orderImage.png', orederMenu[1].orderMenu.split('base64,')[1], { encoding: 'base64' }, function () {
                                OrderMenu.deleteOne({ _id: orederMenu[1]._id }).then(items => {
                                    res.status(200).download('orderImage.png');
                                    setTimeout(() => {
                                        fs.unlink('orderImage.png', (err) => {
                                            if (err) {
                                                console.error(err)
                                                return
                                        ***REMOVED***
                                    ***REMOVED***)
                                ***REMOVED*** 10000);

                            ***REMOVED***);
                        ***REMOVED***);
                    ***REMOVED*** else {
                            return res.status(200).send({
                                message: "There are no orders yet"
                        ***REMOVED***);
                    ***REMOVED***

                ***REMOVED***);
        ***REMOVED***
    ***REMOVED***

***REMOVED***
***REMOVED***