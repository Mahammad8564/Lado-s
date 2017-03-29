"use strict";
module.exports = function (sequelize, DataTypes) {
    var Purchase = sequelize.define("Purchase", {
        purchaseName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username must be unique.'
            }
        },
        purchaseDate: {
            type: DataTypes.STRING,
            allowNull: false

        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalItems: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
        totalCost: {
            allowNull: false,
            type: DataTypes.DECIMAL
        },
    }, {
            classMethods: {
                associate: function (models) {

                     Purchase.hasMany(models.Product);

                }
            }
        }


    );

    return Purchase;
};