const express = require('express');
const EmployeeController = require('../controllers/employee.controller');
const { authEmployee } = require('../middleware/checkPermission');
const ROLES = require('../utils/ROLES');

// import validator
const { validateEmployeePOST } = require('../validations/validate.employee');

const employeeRoutes = express.Router();

employeeRoutes.post(
    '/',
    authEmployee(ROLES['PRESIDENT'], ROLES['MANAGER']),
    validateEmployeePOST,
    EmployeeController.addEmployee
);

employeeRoutes.get(
    '/',
    authEmployee(ROLES['PRESIDENT'], ROLES['MANAGER']),
    EmployeeController.getAllEmployee
);

employeeRoutes.get(
    '/:employeeNumber',
    authEmployee(ROLES['PRESIDENT'], ROLES['MANAGER']),
    EmployeeController.getOneEmployee
);

employeeRoutes.put(
    '/:employeeNumber',
    authEmployee(ROLES['PRESIDENT'], ROLES['MANAGER']),
    EmployeeController.updateEmployee
);

employeeRoutes.delete(
    '/:employeeNumber',
    authEmployee(ROLES['PRESIDENT'], ROLES['MANAGER']),
    EmployeeController.deleteEmployee
);

// export route
module.exports = employeeRoutes;
