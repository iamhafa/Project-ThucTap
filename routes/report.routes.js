const express = require('express');

const reportRoutes = express.Router();

const getReportConstroller = require('../controllers/report.controller');

const ROLES = require('../utils/ROLES');

const { authEmployee } = require('../middleware/checkPermission');

reportRoutes.get(
    '/',
    authEmployee(ROLES['PRESIDENT'], ROLES['MANAGER']),
    getReportConstroller.getReport
);

module.exports = reportRoutes;
