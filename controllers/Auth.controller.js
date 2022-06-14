const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Auth {
    async register(req, res, next) {
        try {
            const info = {
                username: req.body.username,
                password: req.body.password,
                employeeNumber: req.body.employeeNumber
            };

            // use bcrypt to hash the password
            const hashedPassword = await bcrypt.hash(info.password, 10);

            // assign the hashed password to the password field
            info.password = hashedPassword;

            const checkExitUser = await User.findOne({
                where: {
                    username: info.username
                }
            });

            if (checkExitUser) {
                res.status(400).json({
                    status: 'failed',
                    message: `username ${info.username} existed`
                });

                loggerError.error(`username ${info.username} existed`);
            } else {
                const user = await User.create(info);

                res.status(201).json({
                    status: 'success',
                    data: user
                });

                loggerInfo.info(`user ${info.username} created`);
            }
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const dataUser = {
                username: req.body.username,
                password: req.body.password
            };

            // use bcrypt to compare the password in the database with the password in the request
            const user = await User.findOne({
                where: {
                    username: dataUser.username
                }
            });

            if (user) {
                const isPasswordValid = await bcrypt.compare(dataUser.password, user.password);

                if (isPasswordValid) {
                    // create a token when login successfully
                    const token = jwt.sign(
                        {
                            username: dataUser.username,
                            password: dataUser.password
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '1h' }
                    );

                    res.status(200).json({
                        message: 'Login success',
                        yourToken: token
                    });

                    loggerInfo.info(`user ${dataUser.username} login successfully`);
                } else {
                    res.status(401).json({
                        message: 'Password is incorrect'
                    });

                    loggerError.error(`user ${dataUser.username} login failed`);
                }
            } else {
                // if the username or password is not correct
                res.status(401).json({
                    message: 'Username or password is incorrect'
                });

                loggerError.error(`user ${dataUser.username} login failed`);
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Auth();
