const { User, Employee } = require('../models');
const jwt = require('jsonwebtoken');

const authEmployee = (...roles) => {
    return async (req, res, next) => {
        try {
            const bearerHeader = req.headers['authorization'];

            const token = bearerHeader.split(' ')[1];

            // giải mã token (sau khi decode lấy được username và password khi được generate ra token)
            const tokenDecode = jwt.decode(token);

            // import user and employee from db

            const findUser = await User.findOne({
                where: {
                    username: tokenDecode.username
                }
            });

            const id = findUser.employeeNumber;

            const findEmployee = await Employee.findOne({
                where: {
                    employeeNumber: id
                }
            });

            const jobTitle = findEmployee.jobTitle;
            console.log(jobTitle);

            if (roles.includes(jobTitle)) {
                // loggerInfo.info('Authen permission for employee successfully');
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: 'You dont have permission'
                });
                // loggerError.error('Authen permission for employee failed');
            }
        } catch (error) {
            res.status(401).json({ success: false, message: 'Require token' });
        }
    };
};

const authCustomer = (...roles) => {
    return async (req, res, next) => {
        try {
            const bearerHeader = req.headers['authorization'];

            const token = bearerHeader.split(' ')[1];
            // giải mã token (sau khi decode lấy được username và password khi được generate ra token)
            const tokenDecode = jwt.decode(token);

            const findUser = await User.findOne({
                where: {
                    username: tokenDecode.username
                }
            });

            // const id = findUser.employeeNumber;

            const findOwnUser = await Employee.findByPk(findUser.employeeNumber);

            const result = findOwnUser.jobTitle;

            if (roles.includes(result)) {
                // loggerInfo.info('Authen permission for customer successfully');
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: 'You dont have permission'
                });

                // loggerError.error('Authen permission for customer failed');
            }
        } catch (error) {
            res.status(401).json({ success: false, message: 'Require token' });
        }
    };
};

module.exports = {
    authEmployee,
    authCustomer
};
