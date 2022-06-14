'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('Employees', {
            employeeNumber: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            lastName: {
                type: DataTypes.STRING(48)
            },
            firstName: {
                type: DataTypes.STRING(48)
            },
            extension: {
                type: DataTypes.STRING(48)
            },
            email: {
                type: DataTypes.STRING(48)
            },
            officeCode: {
                type: DataTypes.STRING(48)
            },
            reportsTo: {
                type: DataTypes.INTEGER
            },
            jobTitle: {
                type: DataTypes.STRING(32)
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('Employees');
    }
};
