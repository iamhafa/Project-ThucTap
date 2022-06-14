const res = require('express/lib/response');
const Joi = require('joi');

const schemaCustomerPOST = Joi.object({
    customerNumber: Joi.number().positive().required().not(null),
    customerName: Joi.string().min(5).max(50).required().not(null),
    contactLastName: Joi.string().min(3).max(50).required().not(null),
    contactFirstName: Joi.string().min(3).max(50).required().not(null),
    phone: Joi.string().min(8).max(20).required().not(null),
    addressLine1: Joi.string().min(10).max(50).required().not(null),
    addressLine2: Joi.string().optional().min(10).max(50).allow(null),
    city: Joi.string().min(2).max(50).required().not(null),
    state: Joi.string().optional().min(2).max(50).allow(null),
    postalCode: Joi.string().optional().min(5).max(15).allow(null),
    country: Joi.string().min(2).max(50).required().not(null),
    salesRepEmployeeNumber: Joi.number().positive().required().allow(null),
    creditLimit: Joi.number().optional().precision(2).allow(null)
});

const schemaCustomerPUT = Joi.object({
    // not allow to change customerNumber
    customerNumber: Joi.any()
        .forbidden()
        .allow(null)
        .error((field) => {
            res.status(403);
            return new Error(`${field} to change`);
        }),
    customerName: Joi.string().min(5).max(50).required().allow(null),
    contactLastName: Joi.string().min(3).max(50).required().allow(null),
    contactFirstName: Joi.string().min(3).max(50).required().allow(null),
    phone: Joi.string().min(8).max(20).required().allow(null),
    addressLine1: Joi.string().min(10).max(50).required().allow(null),
    addressLine2: Joi.string().optional().min(10).max(50).allow(null),
    city: Joi.string().min(2).max(50).required().allow(null),
    state: Joi.string().optional().min(2).max(50).allow(null),
    postalCode: Joi.string().optional().min(5).max(15).allow(null),
    country: Joi.string().min(2).max(50).required().allow(null),
    salesRepEmployeeNumber: Joi.number().positive().required().allow(null),
    creditLimit: Joi.number().optional().precision(2).allow(null)
});

// export 2 validator
async function validateCustomerPOST(req, res, next) {
    try {
        //* validate with schemaCustomerPOST
        await schemaCustomerPOST.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}

async function validateCustomerPUT(req, res, next) {
    try {
        //* validate with schemaCustomerPUT
        await schemaCustomerPUT.validateAsync(req.body);
        // when validate success, next()
        next();
    } catch (error) {
        res.json({
            status: 'failed',
            message: error.message
        });
    }
}

module.exports = {
    validateCustomerPOST,
    validateCustomerPUT
};
