'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('Orders', {
            orderNumber: {
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            orderDate: {
                type: DataTypes.DATE
            },
            requiredDate: {
                type: DataTypes.DATE
            },
            shippedDate: {
                type: DataTypes.DATE
            },
            status: {
                type: DataTypes.STRING
            },
            comments: {
                type: DataTypes.TEXT
            },
            customerNumber: {
                type: DataTypes.INTEGER
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
        await queryInterface.dropTable('Orders');
    }
};
