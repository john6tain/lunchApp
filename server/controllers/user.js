const User = require('../models/User');
const Menu = require('../models/Menu');
const OrderMenu = require('../models/OrederMenu');
const encryption = require('../utilities/encryption');
const passport = require('passport');
const fs = require("fs");
const formidable = require('formidable');
const path = require('path');

module.exports = {
    register: {
        post: (req, res) => {
            let userData = req.body;
            if (!userData.username) {
                return res.status(403).send({ message: 'Cannot register user with blank username!' });
            }
            if (userData.password && userData.password !== userData.confirmedPassword) {
                return res.status(403).send({ message: 'Passwords do not match' });
            }

            let salt = encryption.generateSalt();
            userData.salt = salt;

            if (userData.password) {
                userData.password = encryption.generateHashedPassword(salt, userData.password);
            }
            User.find({ username: userData.username }).then(existingUser => {
                if (existingUser.length === 0) {
                    User.create(userData)
                        .then(user => {
                            //TODO: check if user exist
                            res.status(200).send({ success: true, message: 'You successfully registered user now Please login' });
                        })
                        .catch(error => {
                            userData.error = error;
                            res.status(404).send({ error: error });
                        });

                    return;
                }

                res.status(403).send({ message: 'That username is already registered. Please pick another. ' });
            });

        },
    },
    login: {
        post: (req, res, next) => {
            let userData = req.body;
            User.findOne({ username: userData.username }).then(user => {
                if (!user || !user.authenticate(userData.password)) {
                    return res.status(403).send({ message: 'Wrong credentials' });
                }

                return passport.authenticate('passport', (err, token, userData) => {
                    if (err) {
                        if (err.name === 'IncorrectCredentialsError') {
                            return res.status(200).json({
                                success: false,
                                message: err.message
                            });
                        }

                        return res.status(200).json({
                            success: false,
                            message: 'Could not process the form.'
                        });
                    }

                    return res.json({
                        success: true,
                        message: 'You have successfully logged in!',
                        token,
                        user: userData
                    });
                })(req, res, next);
            });
        },
    },

    sendLunchRequest: (req, res) => {
        let userData = req.body;

        if (!userData.user) {
            return res.status(403).send({ message: 'Cannot send lunch request without your name' });
        }
        if (!userData.menu) {
            return res.status(403).send({ message: 'You first need to select from the menu' });
        }
        Menu.find({ user: userData.user }).then(existingUser => {
            if (existingUser.length === 0) {
                Menu.create(userData)
                    .then(user => {
                        //TODO: check if user exist
                        return res.json({
                            success: true,
                            message: 'You have successfully request your lunch!',
                        });
                    })
                    .catch(error => {
                        userData.error = error;
                        res.status(404).send({ error: error });
                    });

                return;
            }

            res.status(403).send({ message: 'That username is already in use. Please pick another.' });
        });

    },

    logout: (req, res) => {
        req.logout();
        res.status(200).end();
    },

    requests: {
        delete: (req, res) => {
            if (!req.params || !req.params.id) {
                return res.status(401).send({ message: 'You have to enter Menu ID' });
            }

            Menu.deleteOne({ _id: req.params.id }).then(items => {
                Menu
                    .find()
                    .then(menu => {
                        if (menu.length === 0) {
                            return res.status(200).send({
                                menu: [],
                                message: "There are no requests to display. Please add some!"
                            });

                        }
                        return res.json({
                            success: true,
                            menu: { menu },
                            message: 'You have successfully delete a lunch request !',
                        });
                    });

            })
                .catch(error => {
                    res.status(404).send({ message: 'No records Found' });
                });
        },

        get: (req, res) => {
            Menu
                .find()
                .then(menu => {
                    if (menu.length === 0) {
                        return res.status(200).send({
                            menu: [],
                            message: "There are no requests to display. Please add some!"
                        });

                    }
                    res.status(200).send({ menu });
                });
            // res.status(200).end();
        }
    },
    menu: {
        update: (req, res) => {
            let menuData = req.body.name && req.body || JSON.parse(Object.keys(req.body).pop());
            OrderMenu.find({ name: menuData.name }).then(existingOrderMenu => {
                if (existingOrderMenu.length === 0) {
                    OrderMenu.create({ name: menuData.name, orderMenu: menuData.orderMenu })
                        .then(orderMenu => {
                            res.status(200).send({ success: true, message: 'You successfully created the Order Menu' });
                        })
                        .catch(error => {
                            res.status(404).send({ error: error });
                        });

                    return;
                } else {
                    OrderMenu.findOneAndUpdate({ name: menuData.name }, { name: menuData.name, orderMenu: menuData.orderMenu })
                        .then(orderMenu => {
                            res.status(200).send({ success: true, message: 'You successfully updated your Order Menu' });
                        })
                        .catch(error => {
                            res.status(404).send({ error: error });
                        });
                    return
                }

                // res.status(403).send({ message: 'This should not have happend' });
            });
        },
        get: (req, res) => {
            OrderMenu
                .find()
                .then(orederMenu => {
                    if (orederMenu.length === 0) {
                        return res.status(200).send({
                            orederMenu: [],
                            message: "You don\t have order menu in the DB"
                        });

                    }

                    res.status(200).send(orederMenu[0]);
                });
        },
        file: {
            upload: (req, res) => {
                OrderMenu.create({ name: 'PNG', orderMenu: req.body.base64 })
                    .then(orderMenu => {
                      res.redirect('/user/menu/upload/get');
                    })
                    .catch(error => {
                        res.status(404).send({ error: error });
                    });
            },
            get: (req, res) => {
                OrderMenu
                    .find()
                    .then(orederMenu => {
                        if (orederMenu.length === 0) {
                            return res.status(200).send({
                                orederMenu: [],
                                message: "You don\t have order menu in the DB"
                            });

                        }
                        if (orederMenu[1] && orederMenu[1].orderMenu) {
                            fs.writeFile('orderImage.png', orederMenu[1].orderMenu.split('base64,')[1], { encoding: 'base64' }, function () {
                                OrderMenu.deleteOne({ _id: orederMenu[1]._id }).then(items => {
                                    res.status(200).download('orderImage.png');
                                    setTimeout(() => {
                                        fs.unlink('orderImage.png', (err) => {
                                            if (err) {
                                                console.error(err)
                                                return
                                            }
                                        })
                                    }, 10000);

                                });
                            });
                        } else {
                            return res.status(200).send({
                                message: "There are no orders yet"
                            });
                        }

                    });
            }
        }

    }
};