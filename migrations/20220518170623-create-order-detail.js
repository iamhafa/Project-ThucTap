'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('OrderDetails', {
            orderNumber: {
                primaryKey: true,
                type: DataTypes.INTEGER(11)
            },
            productCode: {
                primaryKey: true,
                type: DataTypes.STRING(15)
            },
            quantityOrdered: {
                type: DataTypes.INTEGER(11)
            },
            priceEach: {
                type: DataTypes.DECIMAL(10, 2)
            },
            orderLineNumber: {
                type: DataTypes.SMALLINT(6)
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
        await queryInterface.dropTable('OrderDetails');
    }
};
