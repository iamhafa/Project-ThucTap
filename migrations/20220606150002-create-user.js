'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('Users', {
            username: {
                primaryKey: true,
                type: DataTypes.STRING(48)
            },
            password: {
                type: DataTypes.STRING
            },
            employeeNumber: {
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
        await queryInterface.dropTable('Users');
    }
};
