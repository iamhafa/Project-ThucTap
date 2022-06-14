const express = require('express');
const { authCustomer } = require('../middleware/checkPermission');
const CustomerController = require('../controllers/customer.controller');
const ROLES = require('../utils/ROLES');

// import validator
const { validateCustomerPOST, validateCustomerPUT } = require('../validations/validate.customer');

const customerRoutes = express.Router();

customerRoutes.post(
    '/',
    authCustomer(ROLES['PRESIDENT'], ROLES['MANAGER'], ROLES['LEADER']),
    validateCustomerPOST,
    CustomerController.addCustomer
);

customerRoutes.get(
    '/',
    authCustomer(ROLES['PRESIDENT'], ROLES['MANAGER']),
    CustomerController.getAllCustomers
);

customerRoutes.get(
    '/:customerNumber',
    authCustomer(ROLES['PRESIDENT'], ROLES['MANAGER']),
    CustomerController.getOneCustomer
);

customerRoutes.put(
    '/:customerNumber',
    authCustomer(ROLES['PRESIDENT'], ROLES['MANAGER']),
    validateCustomerPUT,
    CustomerController.updateCustomer
);

customerRoutes.delete(
    '/:customerNumber',
    authCustomer(ROLES['PRESIDENT']),
    CustomerController.deleteCustomer
);

// export route
module.exports = customerRoutes;
