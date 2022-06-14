'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Employee }) {
            // define association here
            this.belongsTo(Employee, {
                foreignKey: 'employeeNumber'
            });
        }
    }
    User.init(
        {
            username: {
                primaryKey: true,
                type: DataTypes.STRING(48)
            },
            password: {
                type: DataTypes.STRING
            },
            employeeNumber: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false
        }
    );
    return User;
};
